import pandas as pd
import pickle
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from pathlib import Path

# Load the dataset
data_path = Path(__file__).resolve().parents[1] / "data" / "car_data.csv"
df = pd.read_csv(data_path)

# Prepare features
features = ['year', 'km_driven', 'fuel', 'seller_type', 'transmission', 'owner']
X = pd.get_dummies(df[features])
y = df['selling_price']

# Get column names for one-hot encoding
columns = X.columns.tolist()

# Split and train
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model and columns
model_dir = Path(__file__).resolve().parent / "model"
model_dir.mkdir(exist_ok=True)

with open(model_dir / "car_price_model.pkl", "wb") as f:
    pickle.dump(model, f)

with open(model_dir / "model_columns.pkl", "wb") as f:
    pickle.dump(columns, f)

print("Model trained and saved successfully!")
print(f"Model saved to: {model_dir / 'car_price_model.pkl'}")
print(f"Columns saved to: {model_dir / 'model_columns.pkl'}")
