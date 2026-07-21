from pathlib import Path
from typing import Literal

import joblib
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel, Field


BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "models" / "bike_demand_model.pkl"

app = FastAPI(
    title="Seoul Bike Demand AI API",
    description="Predicts hourly bicycle rental demand in Seoul.",
    version="1.0.0",
)

model = joblib.load(MODEL_PATH)


class BikeDemandFeatures(BaseModel):
    hour: int = Field(ge=0, le=23)
    temperature: float
    humidity: float = Field(ge=0, le=100)
    wind_speed: float = Field(ge=0)
    visibility: float = Field(ge=0)
    dew_point: float
    solar_radiation: float = Field(ge=0)
    rainfall: float = Field(ge=0)
    snowfall: float = Field(ge=0)
    season: Literal["Spring", "Summer", "Autumn", "Winter"]
    holiday: Literal["Holiday", "No Holiday"]
    functioning_day: Literal["Yes", "No"]


@app.get("/")
def root():
    return {
        "message": "Seoul Bike Demand AI API is running",
        "status": "success",
    }


@app.get("/health")
def health():
    return {"status": "OK"}


@app.post("/predict")
def predict(features: BikeDemandFeatures):
    input_df = pd.DataFrame([features.model_dump()])
    input_df = pd.get_dummies(input_df)
    input_df = input_df.reindex(columns=model.feature_names_in_, fill_value=0)

    predicted_count = max(0, round(float(model.predict(input_df)[0])))
    return {"predicted_bike_count": predicted_count}
