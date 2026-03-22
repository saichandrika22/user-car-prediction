from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

import pandas as pd
from pathlib import Path

from .email_service import email_service
from .model_service import predict_price_with_confidence
from .schemas import (
    PredictRequest, PredictResponse, ContactRequest, ContactResponse,
    CarListItem, BrandListItem
)


app = FastAPI(title="Used Car Price Prediction API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    result = predict_price_with_confidence(req.model_dump())
    return PredictResponse(
        predicted_price=float(result["predicted_price"]),
        confidence_lower=float(result["confidence_lower"]),
        confidence_upper=float(result["confidence_upper"]),
    )


_CAR_DF: Optional[pd.DataFrame] = None
_CAR_CSV_PATH = Path(__file__).resolve().parents[2] / "data" / "car_data.csv"


def _load_car_df() -> pd.DataFrame:
    global _CAR_DF
    if _CAR_DF is None:
        _CAR_DF = pd.read_csv(_CAR_CSV_PATH)
    return _CAR_DF


@app.get("/cars", response_model=list[CarListItem])
def list_cars(
    query: Optional[str] = None,
    brand: Optional[str] = None,
    limit: int = 24,
):
    df = _load_car_df()

    # Dataset columns: name, year, selling_price, km_driven, fuel, seller_type, transmission, owner
    if query:
        q = query.strip().lower()
        if q:
            df = df[df["name"].astype(str).str.lower().str.contains(q)]

    if brand:
        b = brand.strip().lower()
        if b:
            # brand is first word of name, e.g. "Maruti 800 AC" -> "maruti"
            brands_series = df["name"].astype(str).str.split().str[0].str.lower()
            df = df[brands_series == b]

    df = df.head(max(1, min(int(limit), 60)))

    cars: list[CarListItem] = []
    for _, row in df.iterrows():
        # Your uploaded dataset does not include a separate Present_Price column.
        # For a better UX in the UI form, we use `selling_price` as a proxy.
        present_price_proxy = float(row["selling_price"]) if "selling_price" in row else 0.0
        cars.append(
            CarListItem(
                car_name=str(row["name"]),
                year=int(row["year"]),
                present_price=present_price_proxy,
                km_driven=int(row["km_driven"]),
                fuel=str(row["fuel"]),
                seller_type=str(row["seller_type"]),
                transmission=str(row["transmission"]),
                owner=str(row["owner"]),
                selling_price=float(row["selling_price"]) if "selling_price" in row else None,
            )
        )

    return cars


@app.get("/brands", response_model=list[BrandListItem])
def list_brands(query: Optional[str] = None):
    df = _load_car_df()

    brands = df["name"].astype(str).str.split().str[0].str.strip()
    counts = brands.value_counts()

    q = query.strip().lower() if query else None
    items: list[BrandListItem] = []

    for brand_name, count in counts.items():
        brand_str = str(brand_name)
        if q and q not in brand_str.lower():
            continue
        # Representative fuel badge for the brand (most common fuel type).
        brand_mask = brands == brand_name
        top_fuel_series = df.loc[brand_mask, "fuel"].astype(str).str.strip()
        top_fuel = top_fuel_series.value_counts().head(1).index[0] if not top_fuel_series.empty else "Petrol"

        items.append(
            BrandListItem(
                brand=brand_str,
                models_count=int(count),
                top_fuel=str(top_fuel),
            )
        )

    items.sort(key=lambda x: x.models_count, reverse=True)
    return items[:30]


@app.get("/brand-average-price")
def get_brand_average_price(brand: str):
    """Get average selling price for a specific brand"""
    df = _load_car_df()
    
    # Extract brand from car name (first word)
    df['brand'] = df['name'].astype(str).str.split().str[0].str.strip()
    
    # Filter by brand
    brand_data = df[df['brand'].str.lower() == brand.lower()]
    
    if brand_data.empty:
        return {"error": "Brand not found"}
    
    # Calculate average price
    avg_price = float(brand_data['selling_price'].mean())
    min_price = float(brand_data['selling_price'].min())
    max_price = float(brand_data['selling_price'].max())
    count = len(brand_data)
    
    return {
        "brand": brand,
        "average_price": avg_price,
        "min_price": min_price,
        "max_price": max_price,
        "sample_size": count
    }


@app.post("/contact", response_model=ContactResponse)
def contact(req: ContactRequest):
    """
    Process contact form submission and send email to configured recipient.
    Messages are sent to mscy4u@gmail.com
    """
    try:
        # Check if email service is configured
        if not email_service.is_configured():
            # If not configured, just log the message (demo mode)
            print(f"Contact form submission (DEMO MODE):")
            print(f"From: {req.email}")
            print(f"Message: {req.message[:100]}...")
            return ContactResponse(status="received_demo")
        
        # Send the email
        success = email_service.send_contact_email(
            user_email=req.email,
            user_message=req.message,
            name=getattr(req, 'name', '')
        )
        
        if success:
            return ContactResponse(status="sent")
        else:
            return ContactResponse(status="failed")
            
    except Exception as e:
        print(f"Error processing contact form: {str(e)}")
        return ContactResponse(status="error")

