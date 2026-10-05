# 🌊 SONAR-SHIELD

### AI-Powered Underwater Marine Debris and Anomaly Detection System using Side-Scan Sonar Imagery

**Smart India Hackathon 2026 — Problem Statement ID: 26057**

SONAR-SHIELD is an AI-assisted underwater sonar analysis system designed to detect objects and anomalies from side-scan sonar imagery. The system uses YOLOv8n for object detection and provides a web-based interface for uploading sonar images and viewing structured detection results.

---

## 🎯 Problem

Manual inspection of side-scan sonar imagery can be time-consuming and requires significant human expertise. Large sonar surveys can contain many images, making rapid and consistent analysis difficult.

SONAR-SHIELD aims to assist this process through AI-based object detection.

---

## 💡 Proposed Solution

The current prototype follows this workflow:

```text
Side-Scan Sonar Image
        ↓
React Frontend
        ↓
FastAPI REST API
        ↓
YOLOv8n
        ↓
Class + Confidence + Bounding Box
        ↓
Detection Results
        ↓
React Dashboard
```

Future integration:

```text
Sonar Survey Metadata
(Latitude / Longitude / Depth / Timestamp)
        ↓
Geo-Tagging
        ↓
Detection Map
        ↓
Reports
```

> GPS, depth, and timestamp information are intended to come from sonar survey metadata, not from the YOLO model.

---

## 🚀 Current Features

- Side-scan sonar image upload
- YOLOv8n object detection
- FastAPI inference backend
- React + Vite dashboard
- Detection class identification
- Confidence score
- Bounding box coordinates
- Detection history
- Settings interface
- Detection map prototype
- Structured JSON detection output

---

## 🤖 Detection Classes

The current trained model contains four classes:

| Class |
|---|
| Aircraft |
| Fish |
| Other |
| Shipwreck |

The current model is **not specifically trained for dedicated plastic, ghost-net, or pipe classes**.

---

## 📊 Model Performance

The current YOLOv8n validation results are:

| Metric | Result |
|---|---:|
| Precision | 61.3% |
| Recall | 45.4% |
| mAP@50 | 50.4% |
| mAP@50–95 | 29.3% |

### Class-wise mAP@50

| Class | mAP@50 |
|---|---:|
| Aircraft | 74.7% |
| Fish | 26.3% |
| Other | 18.3% |
| Shipwreck | 82.4% |

> mAP is an object-detection evaluation metric and should not be interpreted as simple classification accuracy.

---

## 🛠️ Technology Stack

### Frontend
- React
- Vite
- JavaScript
- CSS
- Leaflet / React-Leaflet

### Backend
- Python
- FastAPI
- Uvicorn
- Ultralytics YOLO

### AI / Computer Vision
- YOLOv8n
- OpenCV
- Image preprocessing

### Dataset
- Side-Scan Sonar Object Detection Challenge

---

## 🏗️ Project Structure

```text
SONAR-SHIELD/
│
├── backend/
│   ├── main.py
│   └── best.pt
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── Preprocessing/
│   └── preprocess.py
│
├── data.yaml
├── yolov8n.pt
├── README.md
└── .gitignore
```

---

## ▶️ How to Run

### 1. Clone the repository

```bash
git clone https://github.com/saniyatabassumk/SONAR-SHIELD.git
cd SONAR-SHIELD
```

### 2. Create/activate Python environment

Windows PowerShell:

```powershell
python -m venv venv
venv\Scripts\activate
```

### 3. Install backend dependencies

```powershell
pip install fastapi uvicorn python-multipart ultralytics
```

### 4. Start the backend

```powershell
cd backend
uvicorn main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

### 5. Install frontend dependencies

Open another terminal:

```powershell
cd frontend
npm install
```

### 6. Start the frontend

```powershell
npm run dev
```

Frontend:

```text
http://localhost:5173/
```

---

## 🔬 Current Implementation Status

### Implemented

- YOLOv8n training and validation
- FastAPI + YOLO inference
- React frontend
- Sonar image upload
- Detection results
- Confidence scores
- Bounding boxes
- Detection history
- Dashboard interface

### Planned / Future

- Sonar metadata integration
- Geo-tagged detections
- Advanced detection map
- CSV/PDF automated reports
- More marine debris classes
- Larger and more diverse datasets
- Shadow-aware detection
- Multi-scale detection
- Human-in-the-loop verification
- Larger-scale marine survey deployment

---

## 🌊 Impact

SONAR-SHIELD is intended to assist:

- Marine survey teams
- Environmental researchers
- Coastal and port authorities
- Government agencies
- Ocean researchers
- Academic and research institutions

The system aims to reduce the effort involved in manually inspecting large volumes of sonar imagery while providing structured AI-assisted detection results.

---

## 🔮 Future Vision

```text
More Sonar Data
      ↓
Improved Training
      ↓
Better Object Detection
      ↓
Sonar Metadata Integration
      ↓
Geo-Tagged Detection
      ↓
Automated Mapping & Reporting
      ↓
Large-Scale Marine Monitoring
```

---

## 👥 Team

**SONAR-SHIELD Team**

Smart India Hackathon 2026

**Problem Statement:** 26057

---

## 📌 Disclaimer

SONAR-SHIELD is currently a prototype developed for Smart India Hackathon 2026. Some capabilities, including full sonar metadata integration, geo-tagging, automated reporting, and expanded marine-debris classes, are planned future enhancements.
