from pydantic import BaseModel, Field
from typing import Literal, Optional, List


class PredictRequest(BaseModel):
    brand: str
    model: str
    year: int = Field(ge=1990, le=2026)
    km_driven: int = Field(ge=0, le=2_000_000)
    fuel: Literal["Petrol", "Diesel", "CNG", "LPG", "Electric"]
    seller_type: Literal["Dealer", "Individual", "Trustmark Dealer"]
    transmission: Literal["Manual", "Automatic"]
    owner: Literal[
        "First Owner",
        "Second Owner",
        "Third Owner",
        "Fourth & Above Owner",
    ]


class PredictResponse(BaseModel):
    predicted_price: float
    confidence_lower: float
    confidence_upper: float


class ContactRequest(BaseModel):
    email: str
    message: str


class ContactResponse(BaseModel):
    status: str


class CarListItem(BaseModel):
    car_name: str
    year: int
    present_price: float
    km_driven: int
    fuel: str
    seller_type: str
    transmission: str
    owner: str
    selling_price: Optional[float] = None


class BrandListItem(BaseModel):
    brand: str
    models_count: int
    top_fuel: str
