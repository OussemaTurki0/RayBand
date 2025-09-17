import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  SafeAreaView,
  Keyboard,
  Animated,
} from "react-native";

const GEMINI_API_KEY = "AIzaSyBmR7-QEXWccq_EKDnq41KE17kRFX7_2co";
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export default function SecondOpinion({ setCurrentView }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef();

  // Customize your paddings here:
  const INITIAL_PADDING = 50; // distance from bottom when page opens
  const KEYBOARD_PADDING = -25; // distance above keyboard when typing
  const inputBottom = useRef(new Animated.Value(INITIAL_PADDING)).current;

  // Animated Dot component for typing indicator
  const Dot = ({ delay = 0 }) => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, { toValue: 1, duration: 1000, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: 1000, useNativeDriver: true }),
        ])
      );
      const timer = setTimeout(() => animation.start(), delay);
      return () => {
        animation.stop();
        clearTimeout(timer);
      };
    }, []);

    return (
      <Animated.View
        style={{
          width: 6,
          height: 6,
          backgroundColor: "#9ca3af",
          borderRadius: 3,
          opacity,
          marginHorizontal: 2,
        }}
      />
    );
  };

  // Initial welcome message with typing effect
  useEffect(() => {
    // Show typing indicator first
    setMessages([{ role: "assistant", content: "typing" }]);

    const timeout = setTimeout(() => {
      setMessages([
        {
          role: "assistant",
          content:
            "👋 Hello! I'm your AI health assistant.\n\nAsk me about symptoms, health tips, or medical questions.\n\n⚠️ Remember: Always consult healthcare professionals for serious concerns.",
        },
      ]);
    }, 3000); // 1.5 seconds typing delay

    return () => clearTimeout(timeout);
  }, []);

  // Keyboard listeners
  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardDidShow", (e) => {
      Animated.timing(inputBottom, {
        toValue: e.endCoordinates.height + KEYBOARD_PADDING,
        duration: 250,
        useNativeDriver: false,
      }).start(() => scrollRef.current?.scrollToEnd({ animated: true }));
    });

    const hideListener = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(inputBottom, {
        toValue: INITIAL_PADDING,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }],
        }),
      });

      const data = await res.json();
      const aiText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response from AI";

      setMessages((prev) => [...prev, { role: "assistant", content: aiText }]);
    } catch (err) {
      console.error("Gemini API error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `⚠️ Error contacting AI: ${err.message}` },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, padding: 10 }}>
        {/* Header */}
        <View style={{ backgroundColor: "#dc2626", padding: 12, borderRadius: 8 }}>
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
            RayBand AI Health Assistant
          </Text>
          <Text style={{ color: "#fff", opacity: 0.9 }}>
            Ask me about your health concerns
          </Text>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1, marginVertical: 12 }}
          contentContainerStyle={{ paddingBottom: INITIAL_PADDING + 80 }}
        >
          {messages.map((m, i) => (
            <View
              key={i}
              style={{
                flexDirection: "row",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  maxWidth: "80%",
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor: m.role === "user" ? "#dc2626" : "#e5e7eb",
                  borderBottomRightRadius: m.role === "user" ? 0 : 8,
                  borderBottomLeftRadius: m.role === "user" ? 8 : 0,
                }}
              >
                {m.content === "typing" ? (
                  <View style={{ flexDirection: "row" }}>
                    <Dot />
                    <Dot delay={200} />
                    <Dot delay={400} />
                  </View>
                ) : (
                  <Text
                    style={{
                      color: m.role === "user" ? "#fff" : "#111827",
                      whiteSpace: Platform.OS === "web" ? "pre-wrap" : "normal",
                    }}
                  >
                    {m.content}
                  </Text>
                )}
              </View>
            </View>
          ))}

          {/* Typing Indicator for subsequent AI messages */}
          {isLoading && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  backgroundColor: "#e5e7eb",
                  padding: 10,
                  borderRadius: 8,
                  flexDirection: "row",
                }}
              >
                <Dot />
                <Dot delay={200} />
                <Dot delay={400} />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Animated Input Row */}
        <Animated.View
          style={{
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
            position: "absolute",
            left: 10,
            right: 10,
            bottom: inputBottom,
          }}
        >
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => {
              setCurrentView("home");
              setMessages([]);
              setInputMessage("");
            }}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              backgroundColor: "#6b7280",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>Back</Text>
          </TouchableOpacity>

          {/* Text Input */}
          <TextInput
            value={inputMessage}
            onChangeText={setInputMessage}
            placeholder="Ask about your health concerns..."
            style={{
              flex: 1,
              padding: 10,
              borderWidth: 1,
              borderColor: "#d1d5db",
              borderRadius: 8,
              backgroundColor: "#fff",
            }}
            editable={!isLoading}
            multiline
          />

          {/* Send Button */}
          <TouchableOpacity
            onPress={sendMessage}
            disabled={!(inputMessage || "").trim() || isLoading}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 12,
              backgroundColor: "#dc2626",
              justifyContent: "center",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>Send</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
