import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Linking } from "react-native";

const cities = [
  "Tunis","Sfax","Sousse","Gabès","Bizerte","Kairouan","Monastir",
  "Mahdia","Nabeul","Tozeur","Douz","Zarzis","Hammamet","El Kef",
  "Gafsa","Medenine","Kébili","Tataouine","Beja","Siliana"
];

const doctorsByCity = {
  Tunis: [
    { name: "Dr. Ahmed Ben Salem", specialty: "Cardiologist", location: "Tunis Medical Center", phone: "+21671123456" },
    { name: "Dr. Fatima Khelifi", specialty: "General Practitioner", location: "Clinic El Manar", phone: "+21671234567" },
    { name: "Dr. Sami Trabelsi", specialty: "Dermatologist", location: "Tunis Skin Center", phone: "+21671345678" }
  ],
  Sfax: [
    { name: "Dr. Sami Gharbi", specialty: "Orthopedic Surgeon", location: "Sfax University Hospital", phone: "+21674111222" },
    { name: "Dr. Leila Trabelsi", specialty: "Dermatologist", location: "Sfax Dermatology Center", phone: "+21674333444" },
    { name: "Dr. Mohamed Baccar", specialty: "Cardiologist", location: "Sfax Heart Clinic", phone: "+21674555666" }
  ],
  Sousse: [
    { name: "Dr. Mohamed Ben Hassen", specialty: "Pediatrician", location: "Sousse Children's Clinic", phone: "+21673555666" },
    { name: "Dr. Amira Gharbi", specialty: "Ophthalmologist", location: "Sousse Eye Center", phone: "+21673777888" },
    { name: "Dr. Hatem Jaziri", specialty: "General Practitioner", location: "Sousse Health Center", phone: "+21673999111" }
  ],
  Gabès: [
    { name: "Dr. Fathi Mhiri", specialty: "General Practitioner", location: "Gabès Medical Center", phone: "+21675111222" },
    { name: "Dr. Ines Karray", specialty: "Dentist", location: "Gabès Dental Clinic", phone: "+21675333444" },
    { name: "Dr. Youssef Trabelsi", specialty: "Cardiologist", location: "Gabès Heart Center", phone: "+21675555666" }
  ],
  Bizerte: [
    { name: "Dr. Ines Fakhfakh", specialty: "Cardiologist", location: "Bizerte Heart Clinic", phone: "+21672333444" },
    { name: "Dr. Leila Mhiri", specialty: "Dermatologist", location: "Bizerte Skin Center", phone: "+21672555666" },
    { name: "Dr. Ahmed Ben Youssef", specialty: "Pediatrician", location: "Bizerte Children Hospital", phone: "+21672777888" }
  ],
  Kairouan: [
    { name: "Dr. Walid Ben Ali", specialty: "Neurologist", location: "Kairouan Hospital", phone: "+21677555666" },
    { name: "Dr. Fethi Khelifi", specialty: "Orthopedic Surgeon", location: "Kairouan Orthopedic Clinic", phone: "+21677777888" },
    { name: "Dr. Amira Ben Salem", specialty: "Dentist", location: "Kairouan Dental Care", phone: "+21677999111" }
  ],
  Monastir: [
    { name: "Dr. Souad Hammami", specialty: "Gynecologist", location: "Monastir Women's Clinic", phone: "+21673111222" },
    { name: "Dr. Hichem Trabelsi", specialty: "Cardiologist", location: "Monastir Heart Center", phone: "+21673333444" },
    { name: "Dr. Sana Ben Youssef", specialty: "Pediatrician", location: "Monastir Children Clinic", phone: "+21673555666" }
  ],
  Mahdia: [
    { name: "Dr. Khaled Mnif", specialty: "Dentist", location: "Mahdia Dental Care", phone: "+21673333444" },
    { name: "Dr. Salma Trabelsi", specialty: "Dermatologist", location: "Mahdia Skin Center", phone: "+21673555666" },
    { name: "Dr. Fathi Ben Salem", specialty: "Cardiologist", location: "Mahdia Heart Clinic", phone: "+21673777888" }
  ],
  Nabeul: [
    { name: "Dr. Sana Jaziri", specialty: "Pediatrician", location: "Nabeul Children Hospital", phone: "+21672555666" },
    { name: "Dr. Ahmed Ben Khalifa", specialty: "General Practitioner", location: "Nabeul Medical Center", phone: "+21672777888" },
    { name: "Dr. Leila Mhiri", specialty: "Cardiologist", location: "Nabeul Heart Clinic", phone: "+21672999111" }
  ],
  Tozeur: [
    { name: "Dr. Hichem Kallel", specialty: "General Practitioner", location: "Tozeur Health Center", phone: "+21676111222" },
    { name: "Dr. Rania Mhiri", specialty: "Dentist", location: "Tozeur Dental Clinic", phone: "+21676333444" },
    { name: "Dr. Sami Ben Ali", specialty: "Cardiologist", location: "Tozeur Heart Clinic", phone: "+21676555666" }
  ],
  Douz: [
    { name: "Dr. Lilia Ben Salah", specialty: "Orthopedic Surgeon", location: "Douz Clinic", phone: "+21676333444" },
    { name: "Dr. Walid Trabelsi", specialty: "Dermatologist", location: "Douz Skin Center", phone: "+21676555666" },
    { name: "Dr. Sana Ben Hassen", specialty: "General Practitioner", location: "Douz Health Center", phone: "+21676777888" }
  ],
  Zarzis: [
    { name: "Dr. Rania Ben Romdhane", specialty: "Dermatologist", location: "Zarzis Skin Center", phone: "+21675555666" },
    { name: "Dr. Hatem Mnif", specialty: "Cardiologist", location: "Zarzis Heart Clinic", phone: "+21675777888" },
    { name: "Dr. Fathi Jaziri", specialty: "Pediatrician", location: "Zarzis Children Clinic", phone: "+21675999111" }
  ],
  Hammamet: [
    { name: "Dr. Youssef Chouchane", specialty: "Cardiologist", location: "Hammamet Heart Clinic", phone: "+21672111222" },
    { name: "Dr. Amira Ben Salem", specialty: "Dermatologist", location: "Hammamet Skin Center", phone: "+21672333444" },
    { name: "Dr. Sami Trabelsi", specialty: "Pediatrician", location: "Hammamet Children Clinic", phone: "+21672555666" }
  ],
  "El Kef": [
    { name: "Dr. Amal Hachicha", specialty: "Neurologist", location: "El Kef Hospital", phone: "+21678333444" },
    { name: "Dr. Ahmed Ben Salah", specialty: "Cardiologist", location: "El Kef Heart Clinic", phone: "+21678555666" },
    { name: "Dr. Leila Trabelsi", specialty: "Dermatologist", location: "El Kef Skin Center", phone: "+21678777888" }
  ],
  Gafsa: [
    { name: "Dr. Ridha Ksouri", specialty: "General Practitioner", location: "Gafsa Medical Center", phone: "+21676555666" },
    { name: "Dr. Amira Ben Hassen", specialty: "Dentist", location: "Gafsa Dental Clinic", phone: "+21676777888" },
    { name: "Dr. Hatem Ben Salah", specialty: "Cardiologist", location: "Gafsa Heart Clinic", phone: "+21676999111" }
  ],
  Medenine: [
    { name: "Dr. Leila Karray", specialty: "Gynecologist", location: "Medenine Women's Clinic", phone: "+21675111222" },
    { name: "Dr. Sami Ben Romdhane", specialty: "Dermatologist", location: "Medenine Skin Center", phone: "+21675333444" },
    { name: "Dr. Ahmed Ben Hassen", specialty: "Cardiologist", location: "Medenine Heart Clinic", phone: "+21675555666" }
  ],
  Kébili: [
    { name: "Dr. Hatem Ben Romdhane", specialty: "Pediatrician", location: "Kébili Children's Clinic", phone: "+21676777888" },
    { name: "Dr. Sana Ben Salah", specialty: "General Practitioner", location: "Kébili Health Center", phone: "+21676999111" },
    { name: "Dr. Walid Trabelsi", specialty: "Cardiologist", location: "Kébili Heart Clinic", phone: "+21676111222" }
  ],
  Tataouine: [
    { name: "Dr. Mariem Gharbi", specialty: "Dentist", location: "Tataouine Dental Clinic", phone: "+21675333444" },
    { name: "Dr. Fathi Ben Salah", specialty: "Dermatologist", location: "Tataouine Skin Center", phone: "+21675555666" },
    { name: "Dr. Hichem Trabelsi", specialty: "Cardiologist", location: "Tataouine Heart Clinic", phone: "+21675777888" }
  ],
  Beja: [
    { name: "Dr. Monia Ben Youssef", specialty: "Dermatologist", location: "Beja Skin Center", phone: "+21678111222" },
    { name: "Dr. Ahmed Ben Salah", specialty: "Pediatrician", location: "Beja Children Clinic", phone: "+21678333444" },
    { name: "Dr. Hatem Trabelsi", specialty: "Cardiologist", location: "Beja Heart Clinic", phone: "+21678555666" }
  ],
  Siliana: [
    { name: "Dr. Fethi Jaziri", specialty: "General Practitioner", location: "Siliana Health Center", phone: "+21678333444" },
    { name: "Dr. Leila Ben Romdhane", specialty: "Dermatologist", location: "Siliana Skin Center", phone: "+21678555666" },
    { name: "Dr. Hichem Ben Salah", specialty: "Cardiologist", location: "Siliana Heart Clinic", phone: "+21678777888" }
  ]
};

export default function MyDoctors({ setCurrentView }) {
  const [selectedCity, setSelectedCity] = useState(null);
  const cityDoctors = selectedCity ? doctorsByCity[selectedCity] || [] : [];

  if (!selectedCity) {
    return (
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          backgroundColor: "#f7f7f7cc",
          flexGrow: 1,
          alignItems: "center"
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 25 }}>
          Choose Your City
        </Text>

        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
          {cities.map((city, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedCity(city)}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 30,
                backgroundColor: "#fff",
                borderRadius: 15,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.15,
                shadowRadius: 5,
                elevation: 4,
                margin: 7,
                minWidth: 100,
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "600", color: "#1f2937" }}>{city}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => setCurrentView("home")}
          style={{
            marginTop: 20,
            paddingVertical: 14,
            paddingHorizontal: 28,
            backgroundColor: "#6b7280",
            borderRadius: 12,
            alignSelf: "center"
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: "#f7f7f7cc",
        flexGrow: 1
      }}
    >
      <View style={{ marginBottom: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 10 }}>
          Doctors in {selectedCity}
        </Text>
        <TouchableOpacity onPress={() => setSelectedCity(null)}>
          <Text style={{ color: "#dc2626", textDecorationLine: "underline", fontWeight: "600", fontSize: 16 }}>
            ← Choose Different City
          </Text>
        </TouchableOpacity>
      </View>

      {cityDoctors.length > 0 ? (
        cityDoctors.map((doctor, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "#fff",
              borderRadius: 15,
              padding: 20,
              marginBottom: 15,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.15,
              shadowRadius: 5,
              elevation: 3
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 6 }}>{doctor.name}</Text>
            <Text style={{ color: "#4b5563", marginBottom: 3 }}>Specialty: {doctor.specialty}</Text>
            <Text style={{ color: "#4b5563", marginBottom: 8 }}>Location: {doctor.location}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${doctor.phone}`)}>
              <Text style={{ color: "#dc2626", textDecorationLine: "underline", fontWeight: "600" }}>
                {doctor.phone}
              </Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 15,
            padding: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#4b5563", fontSize: 16, marginBottom: 4 }}>
            No doctors available in {selectedCity} yet.
          </Text>
          <Text style={{ color: "#9ca3af", fontSize: 14 }}>More doctors will be added soon!</Text>
        </View>
      )}

      <TouchableOpacity
        onPress={() => {
          setCurrentView("home");
          setSelectedCity(null);
        }}
        style={{
          marginTop: 35,
          paddingVertical: 14,
          paddingHorizontal: 28,
          backgroundColor: "#6b7280",
          borderRadius: 12,
          alignSelf: "center"
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
