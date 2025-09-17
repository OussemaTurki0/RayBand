// PreDiagnose2.jsx
export const computeDerivedFeatures = (data) => {
  // Clamp Heart Rate to realistic range
  const HR = Math.min(Math.max(data.Heart_Rate, 40), 180);
  const Derived_HRV = 60 / HR;
  const Derived_Pulse_Pressure = data.Systolic_Blood_Pressure - data.Diastolic_Blood_Pressure;
  const Derived_BMI = data.Weight / (data.Height ** 2);
  const Derived_MAP = data.Diastolic_Blood_Pressure + Derived_Pulse_Pressure / 3;
  return { Derived_HRV, Derived_Pulse_Pressure, Derived_BMI, Derived_MAP };
};

export const detectConditionsWithExplanation = (data) => {
  const conditions = [];

  if (data.Oxygen_Saturation < 95)
    conditions.push({
      name: "Hypoxia",
      explanation: "Oxygen level is below normal, which may indicate respiratory issues or reduced lung function."
    });

  if (data.Body_Temperature >= 37.5)
    conditions.push({
      name: "Fever",
      explanation: "Body temperature is elevated, which could be due to infection or inflammation."
    });

  if (data.Body_Temperature < 36)
    conditions.push({
      name: "Hypothermia",
      explanation: "Body temperature is below normal, which may be caused by cold exposure or metabolic issues."
    });

  if (data.Heart_Rate >= 100)
    conditions.push({
      name: "Tachycardia",
      explanation: "Heart rate is high, possibly caused by stress, dehydration, or heart conditions."
    });

  if (data.Heart_Rate < 60)
    conditions.push({
      name: "Bradycardia",
      explanation: "Heart rate is low, which may be due to athletic conditioning or heart conduction problems."
    });

  if (data.Systolic_Blood_Pressure > 130 || data.Diastolic_Blood_Pressure > 85)
    conditions.push({
      name: "Hypertension",
      explanation: "Blood pressure is elevated, increasing risk of heart disease, influenced by age, weight, or lifestyle."
    });

  if (data.Systolic_Blood_Pressure < 90 || data.Diastolic_Blood_Pressure < 60)
    conditions.push({
      name: "Hypotension",
      explanation: "Blood pressure is below normal, which may lead to dizziness or fainting."
    });

  if (data.Respiratory_Rate < 12)
    conditions.push({
      name: "Bradypnea",
      explanation: "Respiratory rate is low, which may indicate respiratory depression."
    });

  if (data.Respiratory_Rate > 20)
    conditions.push({
      name: "Tachypnea",
      explanation: "Respiratory rate is high, which may indicate breathing difficulties or metabolic issues."
    });

  if (conditions.length === 0)
    conditions.push({
      name: "Normal",
      explanation: "All vital signs are within normal ranges."
    });

  return conditions;
};

// Smooth probability for display
export const smoothProb = (p) => 0.01 + 0.98 * p;

// Map numerical risk to string
export const mapRiskCategory = (value) => {
  if (value === 0 || value === "0") return "Low Risk";
  if (value === 1 || value === "1") return "High Risk";
  return value;
};
