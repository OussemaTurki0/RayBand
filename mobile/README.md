# Author

Oussema Turki - oussematurki0@gmail.com

# RayBand Mobile App

RayBand Mobile is a **cross-platform React Native/Expo application** designed for real-time health monitoring via a connected wearable device. The app displays heart rate, oxygen level, temperature, and other vital data, and provides AI-powered diagnostics, alerts, and user-friendly visualizations.

---

## Features

- **Real-Time Health Monitoring**: Display live heart rate (BPM), oxygen saturation, temperature, and more from a connected ESP32 wearable.
- **AI Diagnostics**: Analyze health data with an AI model system that provides risk assessment, possible conditions, and doctor recommendations.
- **Weekly Analytics**: Visualize weekly trends for heart rate, oxygen level, and temperature using charts.
- **User Profiles**: Edit and manage wearer information including medical history, allergies, and health tips.
- **Location-Based Features**: Track GPS coordinates and find nearby healthcare providers.
- **QR Scanner Integration**: Quickly scan QR codes to connect devices or access specific features.
- **Animated AI Interface**: Visually engaging AI page with animated backgrounds for AI interaction.

---

## Tech Stack

- **Frontend**: React Native + Expo + TypeScript
- **State Management**: React Hooks, Context API
- **Charts**: `react-native-chart-kit`
- **Localization**: `i18next`
- **Backend**: Python Flask server (`server.py`) for AI computations and data handling
- **Realtime Data**: Firebase Realtime Database for heart pulse updates
- **ESP32 Integration**: Uploads sensor data to Firebase for real-time consumption
- **Navigation**: React Navigation
- **Styling**: Tailwind CSS (via `tailwind-rn`) and custom styles

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/RayBand.git
cd RayBand/mobile


Install dependencies:

npm install


Start the backend server (for AI computations):

uvicorn server:app --reload --host 0.0.0.0 --port 8000
# or
python -m uvicorn server:app --reload --host 0.0.0.0 --port 8000


Start the Expo frontend:

npx expo start --tunnel


The --tunnel option allows iOS devices to connect when running on Windows.


---
