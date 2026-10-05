from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import shutil

app = FastAPI()


# =========================
# CORS CONFIGURATION
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# LOAD YOLO MODEL
# =========================

model = YOLO("best.pt")


# =========================
# HOME
# =========================

@app.get("/")
def home():
    return {
        "message": "SONAR-SHIELD Backend is running!"
    }


# =========================
# YOLO PREDICTION
# =========================

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    # Save uploaded image
    with open("uploaded_image.jpg", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Run YOLO
    results = model("uploaded_image.jpg")

    detections = []

    for result in results:

        for box in result.boxes:

            class_id = int(box.cls[0])

            confidence = float(box.conf[0])

            class_name = model.names[class_id]

            x1, y1, x2, y2 = box.xyxy[0].tolist()

            detections.append({
                "class": class_name,
                "confidence": confidence,
                "box": [
                    x1,
                    y1,
                    x2,
                    y2
                ]
            })

    return {
        "detections": detections
    }