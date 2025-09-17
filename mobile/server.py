import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Union
import tensorflow as tf

# ----- Load your Keras model -----
MODEL_PATH = "src/components/main/ai/my_vitals_model.h5"
model = tf.keras.models.load_model(MODEL_PATH)

app = FastAPI(title="AI Risk Predictor")

# CORS configuration for mobile and web
origins = ["*"]  # Allow all origins for testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PatientVitals(BaseModel):
    Heart_Rate: float
    Respiratory_Rate: float
    Body_Temperature: float
    Oxygen_Saturation: float
    Systolic_Blood_Pressure: float
    Diastolic_Blood_Pressure: float
    Age: float
    Gender: float
    Weight: float
    Height: float
    Derived_HRV: float
    Derived_Pulse_Pressure: float
    Derived_BMI: float
    Derived_MAP: float

def map_risk(prob: float) -> int:
    return 1 if prob >= 0.5 else 0

@app.post("/predict")
async def predict(vitals: Union[PatientVitals, List[PatientVitals]]):
    try:
        vitals_list = vitals if isinstance(vitals, list) else [vitals]

        X = np.array([
            [
                v.Heart_Rate,
                v.Respiratory_Rate,
                v.Body_Temperature,
                v.Oxygen_Saturation,
                v.Systolic_Blood_Pressure,
                v.Diastolic_Blood_Pressure,
                v.Age,
                v.Gender,
                v.Weight,
                v.Height,
                v.Derived_HRV,
                v.Derived_Pulse_Pressure,
                v.Derived_BMI,
                v.Derived_MAP
            ]
            for v in vitals_list
        ])

        predictions = model.predict(X)
        results = [{"Probability": float(p[0]), "Predicted_Risk": map_risk(p[0])} for p in predictions]
        return {"results": results}

    except Exception as e:
        return {"error": str(e)}
