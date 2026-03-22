import pickle
from pathlib import Path
from typing import Dict, Any

import numpy as np
import pandas as pd

# Model paths relative to backend/app/
_MODEL_DIR = Path(__file__).resolve().parents[1] / "model"
_MODEL_PATH = _MODEL_DIR / "car_price_model.pkl"
_COLUMNS_PATH = _MODEL_DIR / "model_columns.pkl"

# Load model and columns once at startup
model = pickle.load(open(_MODEL_PATH, "rb"))
columns = pickle.load(open(_COLUMNS_PATH, "rb"))


def _prepare_features(data: dict) -> pd.DataFrame:
    """Convert raw input dict into model-ready one-hot encoded dataframe."""
    df = pd.DataFrame([data])
    df = pd.get_dummies(df)
    df = df.reindex(columns=columns, fill_value=0)
    return df


def predict_price_with_confidence(data: Dict[str, Any], z: float = 1.96) -> Dict[str, float]:
    """
    Returns:
      - predicted_price: mean prediction (RandomForestRegressor)
      - confidence_lower: mean - z * std(tree_predictions)
      - confidence_upper: mean + z * std(tree_predictions)

    Confidence computed using Option A:
      predictions from all trees -> std deviation.
    """
    df = _prepare_features(data)

    mean_pred = float(model.predict(df)[0])

    # RandomForestRegressor exposes per-tree estimators via `estimators_`.
    if hasattr(model, "estimators_"):
        tree_preds = np.array([est.predict(df)[0] for est in model.estimators_], dtype=float)
        std = float(tree_preds.std(axis=0, ddof=0))
    else:
        std = 0.0

    lower = mean_pred - (z * std)
    upper = mean_pred + (z * std)

    # Price can't be negative.
    lower = max(0.0, float(lower))
    upper = max(0.0, float(upper))

    return {
        "predicted_price": mean_pred,
        "confidence_lower": lower,
        "confidence_upper": upper,
    }


def predict_price(data):
    # Backward-compatible helper for the legacy Streamlit UI.
    return predict_price_with_confidence(data)["predicted_price"]
