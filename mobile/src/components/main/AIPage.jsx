import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, StatusBar } from "react-native";
import PreDiagnose from "./ai/PreDiagnose";
import SecondOpinion from "./ai/SecondOpinion";
import MyDoctors from "./ai/MyDoctors";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const FONT_SIZE = 16;
const COLUMNS = Math.floor(SCREEN_WIDTH / FONT_SIZE);
const CHARACTERS = ["0", "1"];
const TRAIL_LENGTH = 15;

export default function AIPage() {
  const [currentView, setCurrentView] = useState("home");
  const [drops, setDrops] = useState(Array(COLUMNS).fill(-Math.floor(Math.random() * TRAIL_LENGTH))); // start offscreen

  useEffect(() => {
    const interval = setInterval(() => {
      setDrops((prev) =>
        prev.map((drop) =>
          drop * FONT_SIZE > SCREEN_HEIGHT ? -Math.floor(Math.random() * TRAIL_LENGTH) : drop + 1
        )
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (currentView === "home") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

        {/* Full screen container */}
        <View style={styles.container}>
          {/* Matrix Background */}
          {drops.map((drop, colIndex) => {
            const trail = [];
            for (let i = 0; i < TRAIL_LENGTH; i++) {
              const char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
              const top = (drop - i) * FONT_SIZE;
              if (top >= -TRAIL_LENGTH * FONT_SIZE && top < SCREEN_HEIGHT) {
                trail.push(
                  <Text
                    key={i}
                    style={[
                      styles.matrixText,
                      {
                        left: colIndex * FONT_SIZE,
                        top,
                        opacity: 1 - i / TRAIL_LENGTH,
                      },
                    ]}
                  >
                    {char}
                  </Text>
                );
              }
            }
            return trail;
          })}

          {/* Foreground content */}
          <View style={styles.content}>
            <View style={{ alignItems: "center", marginBottom: 40 }}>
              <Text style={styles.title}>
                Hi, I'm <Text style={{ color: "#dc2626" }}>RayBand AI Assistant</Text>
              </Text>
              <Text style={styles.subtitle}>How can I help you today?</Text>
            </View>

            <View style={{ width: "100%", maxWidth: 300 }}>
              <TouchableOpacity
                onPress={() => setCurrentView("prediagnose")}
                style={[styles.button, { backgroundColor: "#dc2626", marginBottom: 16 }]}
              >
                <Text style={styles.buttonText}>Pre-Diagnose</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setCurrentView("secondopinion")}
                style={[styles.button, { backgroundColor: "#10b981", marginBottom: 16 }]}
              >
                <Text style={styles.buttonText}>Second Opinion</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setCurrentView("mydoctors")}
                style={[styles.button, { backgroundColor: "#3b82f6" }]}
              >
                <Text style={styles.buttonText}>My Doctors</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (currentView === "prediagnose") return <PreDiagnose setCurrentView={setCurrentView} />;
  if (currentView === "secondopinion") return <SecondOpinion setCurrentView={setCurrentView} />;
  if (currentView === "mydoctors") return <MyDoctors setCurrentView={setCurrentView} />;

  return null;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7cc",
    position: "relative", // ensures matrix fills the whole screen
  },
  matrixText: {
    position: "absolute",
    color: "#ef4444",
    fontSize: FONT_SIZE,
    fontFamily: "monospace",
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
