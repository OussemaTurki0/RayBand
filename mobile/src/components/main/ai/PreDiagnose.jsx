import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {
  computeDerivedFeatures,
  detectConditionsWithExplanation,
  smoothProb,
  mapRiskCategory,
} from "./PreDiagnose2";

const API_URL =
  Platform.OS === "web"
    ? "http://localhost:8000/predict"
    : "https://0042d7d666b8.ngrok-free.app/predict"; // ngrok URL pour iPhone

export default function PreDiagnose({ setCurrentView }) {
  const [formData, setFormData] = useState({
    Heart_Rate: 72,
    Respiratory_Rate: 16,
    Body_Temperature: 36.8,
    Oxygen_Saturation: 97,
    Systolic_Blood_Pressure: 120,
    Diastolic_Blood_Pressure: 80,
    Age: 30,
    Gender: "Male",
    Weight: 70,
    Height: 1.75,
    Derived_HRV: 60 / 72,
    Derived_Pulse_Pressure: 40,
    Derived_BMI: 70 / (1.75 ** 2),
    Derived_MAP: 93.333,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const NORMAL_RANGES = {
    Heart_Rate: [60, 100],
    Respiratory_Rate: [12, 20],
    Body_Temperature: [36.1, 37.5],
    Oxygen_Saturation: [95, 100],
    Systolic_Blood_Pressure: [90, 120],
    Diastolic_Blood_Pressure: [60, 80],
  };

  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(formData.Gender);
  const [genderItems, setGenderItems] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, Gender: genderValue }));
  }, [genderValue]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === "Gender" ? value : parseFloat(value) || 0,
    }));
  };

  const isAbnormal = (key, value) => {
    if (!NORMAL_RANGES[key]) return false;
    const [min, max] = NORMAL_RANGES[key];
    return value < min || value > max;
  };

  const fetchPrediction = async () => {
    setLoading(true);
    try {
      const derived = computeDerivedFeatures(formData);
      const payload = [
        { ...formData, Gender: formData.Gender === "Male" ? 1 : 0, ...derived },
      ];

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to fetch from API");
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const cond = detectConditionsWithExplanation(formData);
      setResult({ ...data.results[0], cond });
    } catch (err) {
      console.error("Prediction error:", err);
      setResult({ error: err.message || "Failed to fetch prediction" });
    } finally {
      setLoading(false);
    }
  };

  const setPatient = (patientNumber) => {
    let data;
    if (patientNumber === 1) {
      data = {
        Heart_Rate: 72,
        Respiratory_Rate: 16,
        Body_Temperature: 36.8,
        Oxygen_Saturation: 97,
        Systolic_Blood_Pressure: 120,
        Diastolic_Blood_Pressure: 80,
        Age: 30,
        Gender: "Male",
        Weight: 70,
        Height: 1.75,
      };
    } else if (patientNumber === 2) {
      data = {
        Heart_Rate: 95,
        Respiratory_Rate: 18,
        Body_Temperature: 39,
        Oxygen_Saturation: 92,
        Systolic_Blood_Pressure: 135,
        Diastolic_Blood_Pressure: 85,
        Age: 55,
        Gender: "Female",
        Weight: 82,
        Height: 1.68,
      };
    } else if (patientNumber === 3) {
      data = {
        Heart_Rate: 120,
        Respiratory_Rate: 17,
        Body_Temperature: 37.2,
        Oxygen_Saturation: 95,
        Systolic_Blood_Pressure: 140,
        Diastolic_Blood_Pressure: 88,
        Age: 65,
        Gender: "Female",
        Weight: 90,
        Height: 1.65,
      };
    }
    const derived = computeDerivedFeatures(data);
    setFormData({ ...data, ...derived });
    setGenderValue(data.Gender);
  };

  const buttonStyle = (bgColor, textColor) => ({
    backgroundColor: bgColor,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 4,
  });

  const buttonTextStyle = (color) => ({
    color,
    fontWeight: "bold",
    fontSize: 16,
  });

  const renderInputs = () => {
    const keys = Object.keys(formData);
    const rows = [];
    for (let i = 0; i < keys.length; i += 2) {
      rows.push(
        <View
          key={i}
          style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}
        >
          {[keys[i], keys[i + 1]].map((key) =>
            key ? (
              <View key={key} style={{ flex: 0.48 }}>
                <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
                  {key} {isAbnormal(key, formData[key]) && <Text style={{ color: "#dc2626" }}>⚠️</Text>}
                </Text>
                {key === "Gender" ? (
                  <DropDownPicker
                    open={genderOpen}
                    value={genderValue}
                    items={genderItems}
                    setOpen={setGenderOpen}
                    setValue={setGenderValue}
                    setItems={setGenderItems}
                    containerStyle={{ marginTop: 4, zIndex: 1000 }}
                    style={{
                      borderColor: "#d1d5db",
                      backgroundColor: "#fff",
                    }}
                    dropDownStyle={{ backgroundColor: "#fff" }}
                  />
                ) : (
                  <TextInput
                    value={formData[key].toString()}
                    onChangeText={(value) => handleChange(key, value)}
                    keyboardType="numeric"
                    style={{
                      borderWidth: 1,
                      borderColor: isAbnormal(key, formData[key]) ? "#dc2626" : "#d1d5db",
                      borderRadius: 8,
                      padding: 8,
                      backgroundColor: isAbnormal(key, formData[key]) ? "#fee2e2" : "#fff",
                      fontSize: 14,
                    }}
                  />
                )}
              </View>
            ) : null
          )}
        </View>
      );
    }
    return rows;
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20, paddingBottom: 80 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#dc2626", textAlign: "center", marginBottom: 20 }}>
        Pre-Diagnose
      </Text>

      <View style={{ marginBottom: 20 }}>{renderInputs()}</View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
        <TouchableOpacity
          onPress={fetchPrediction}
          disabled={loading}
          style={{ ...buttonStyle(loading ? "#9ca3af" : "#dc2626", "#fff"), flex: 1 }}
        >
          <Text style={buttonTextStyle("#fff")}>{loading ? "Predicting..." : "Get Prediction"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setCurrentView("home");
            setFormData({
              Heart_Rate: 72,
              Respiratory_Rate: 16,
              Body_Temperature: 36.8,
              Oxygen_Saturation: 97,
              Systolic_Blood_Pressure: 120,
              Diastolic_Blood_Pressure: 80,
              Age: 30,
              Gender: "Male",
              Weight: 70,
              Height: 1.75,
              Derived_HRV: 60 / 72,
              Derived_Pulse_Pressure: 40,
              Derived_BMI: 70 / (1.75 ** 2),
              Derived_MAP: 93.333,
            });
            setGenderValue("Male");
            setResult(null);
          }}
          style={{ ...buttonStyle("#6b7280", "#fff"), flex: 1, marginLeft: 8 }}
        >
          <Text style={buttonTextStyle("#fff")}>Back</Text>
        </TouchableOpacity>
      </View>

      {result && (
        <View style={{ marginVertical: 12 }}>
          {result.error ? (
            <Text style={{ color: "#dc2626", fontWeight: "bold" }}>{result.error}</Text>
          ) : (
            <>
              <Text style={{ marginBottom: 2 }}>
                Predicted Probability: {smoothProb(result.Probability).toFixed(4)}
              </Text>
              <Text style={{ marginBottom: 2 }}>
                Predicted Risk Category: {mapRiskCategory(result.Predicted_Risk)}
              </Text>
              <Text style={{ fontWeight: "bold", marginTop: 8, marginBottom: 4 }}>
                Analyse based on the condition:
              </Text>
              {result.cond.map((c, i) => (
                <Text key={i}>• {c.name}: {c.explanation}</Text>
              ))}
            </>
          )}
        </View>
      )}

      <Text style={{ fontWeight: "bold", marginBottom: 8 }}>For Development Purposes Only</Text>
      <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 60 }}>
        <TouchableOpacity onPress={() => setPatient(1)} style={buttonStyle("#16a34a", "#fff")}>
          <Text style={buttonTextStyle("#fff")}>Patient 001</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPatient(2)} style={buttonStyle("#facc15", "#000")}>
          <Text style={buttonTextStyle("#000")}>Patient 002</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPatient(3)} style={buttonStyle("#dc2626", "#fff")}>
          <Text style={buttonTextStyle("#fff")}>Patient 003</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
