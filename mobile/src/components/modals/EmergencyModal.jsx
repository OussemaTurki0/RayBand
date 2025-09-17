import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function EmergencyModal({ setShowEmergencyModal, handleSOS }) {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 16,
          padding: 30,
          width: "100%",
          maxWidth: 300,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 48,
            marginBottom: 20,
          }}
        >
          🚨
        </Text>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#dc2626",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          Emergency Alert
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: "#6b7280",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Emergency services will be contacted and your location will be shared
          with emergency contacts.
        </Text>

        <View style={{ flexDirection: "row", width: "100%" }}>
          <TouchableOpacity
            onPress={() => setShowEmergencyModal(false)}
            style={{
              flex: 1,
              backgroundColor: "#f3f4f6",
              paddingVertical: 12,
              borderRadius: 8,
              alignItems: "center",
              marginRight: 8,
            }}
          >
            <Text
              style={{ color: "#374151", fontSize: 16, fontWeight: "500" }}
            >
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setShowEmergencyModal(false);
              // Handle emergency action here
            }}
            style={{
              flex: 1,
              backgroundColor: "#dc2626",
              paddingVertical: 12,
              borderRadius: 8,
              alignItems: "center",
              marginLeft: 8,
            }}
          >
            <Text
              style={{ color: "#ffffff", fontSize: 16, fontWeight: "600" }}
            >
              Call SOS
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
