import { useState } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";

// Kept from the original file (not used by any page in this version).
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

/* =========================================================
   MAIN APP (LOGIN)
========================================================= */

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      setLoggedIn(true);
    }
  };

  if (!loggedIn) {
    return (
      <div className="welcome-screen">
        <div className="sonar-bg">
          <div className="sonar-ring ring1"></div>
          <div className="sonar-ring ring2"></div>
          <div className="sonar-ring ring3"></div>
          <div className="sonar-ring ring4"></div>
          <div className="sonar-sweep"></div>
          <div className="sonar-point"></div>
        </div>

        <div className="welcome-content">
          {/* LEFT SIDE */}
          <div className="welcome-info">
            <div className="brand">
              <div className="brand-icon">◈</div>
              <div>
                <h2>SonarShield</h2>
                <span>UNDERWATER INTELLIGENCE</span>
              </div>
            </div>

            <div className="welcome-text">
              <p className="eyebrow">AI-POWERED SONAR ANALYSIS</p>
              <h1>
                See What Lies
                <br />
                <span>Beneath.</span>
              </h1>
              <p className="description">
                Intelligent detection of underwater objects and anomalies
                using side-scan sonar imagery.
              </p>
            </div>

            <div className="feature-row">
              <div className="feature">
                <div className="feature-icon">◎</div>
                <div>
                  <strong>Detect</strong>
                  <small>AI object detection</small>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">◉</div>
                <div>
                  <strong>Analyze</strong>
                  <small>Sonar image processing</small>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon">✓</div>
                <div>
                  <strong>Identify</strong>
                  <small>Confidence-based results</small>
                </div>
              </div>
            </div>
          </div>

          {/* LOGIN */}
          <div className="login-card">
            <div className="login-top">
              <div className="login-symbol">◈</div>
              <div>
                <h2>Welcome back</h2>
                <p>Sign in to access SonarShield</p>
              </div>
            </div>

            <form onSubmit={handleLogin}>
              <label>Username</label>
              <div className="input-box">
                <span>◉</span>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <label>Password</label>
              <div className="input-box">
                <span>◆</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="login-options">
                <label className="remember">
                  <input type="checkbox" />
                  Remember me
                </label>
                <span>Secure Access</span>
              </div>

              <button className="login-button" type="submit">
                Enter SonarShield
                <span>→</span>
              </button>
            </form>

            <div className="security-note">
              <span className="green-dot"></span>
              Protected AI analysis environment
            </div>
          </div>
        </div>

        <div className="welcome-footer">
          SONARSHIELD
          <span>•</span>
          MARINE INTELLIGENCE SYSTEM
        </div>
      </div>
    );
  }

  return <Dashboard />;
}

/* =========================================================
   DASHBOARD + NAVIGATION
========================================================= */

const NAV_ITEMS = [
  ["dashboard", "⌂", "Dashboard"],
  ["analysis", "◉", "Sonar Analysis"],
  ["history", "▣", "Detection History"],
  ["settings", "⚙", "Settings"],
];

function Dashboard() {
  const [page, setPage] = useState("dashboard");
  const [history, setHistory] = useState([]);

  /* Receives the real YOLO results after an image has been analyzed. */
  const saveToHistory = (fileName, detections) => {
    const newRecord = {
      id: Date.now(),
      fileName: fileName,
      detections: detections,
      date: new Date().toLocaleString(),
    };
    setHistory((previous) => [newRecord, ...previous]);
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">◈</div>
          <div>
            <h2>SonarShield</h2>
            <span>Marine Intelligence</span>
          </div>
        </div>

        <nav>
          {NAV_ITEMS.map(([key, icon, label]) => (
            <button
              key={key}
              className={`nav-item ${page === key ? "active" : ""}`}
              onClick={() => setPage(key)}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        <div className="system-status">
          <div className="status-dot"></div>
          <div>
            <strong>System Online</strong>
            <small>AI Engine Ready</small>
          </div>
        </div>
      </aside>

      <main className="main">
        <div className="main-inner" key={page}>
          {page === "dashboard" && (
            <DashboardPage
              onOpenAnalysis={() => setPage("analysis")}
              onSaveHistory={saveToHistory}
            />
          )}
          {page === "analysis" && (
            <AnalysisPage onSaveHistory={saveToHistory} />
          )}
          {page === "history" && <HistoryPage history={history} />}
          {page === "settings" && <SettingsPage />}
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   SHARED PAGE HEADER
========================================================= */

function PageHeader({ eyebrow, title, subtitle, status }) {
  return (
    <header className="header">
      <div>
        <p className="small-title">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="subtitle">{subtitle}</p>
      </div>
      <div className="model-status">
        <span className="green-dot"></span>
        {status}
      </div>
    </header>
  );
}

/* =========================================================
   DASHBOARD PAGE
========================================================= */

function DashboardPage({ onOpenAnalysis, onSaveHistory }) {
  const [lastResults, setLastResults] = useState([]);
  const [lastFile, setLastFile] = useState("");

  const handleAnalyzed = (fileName, detections) => {
    setLastFile(fileName);
    setLastResults(detections);
    onSaveHistory(fileName, detections);
  };

  const averageConfidence =
    lastResults.length > 0
      ? (lastResults.reduce((sum, item) => sum + item.confidence, 0) /
          lastResults.length) *
        100
      : 0;

  return (
    <>
      <PageHeader
        eyebrow="UNDERWATER INTELLIGENCE"
        title="Sonar Analysis Dashboard"
        subtitle="Automated detection of underwater objects and anomalies using side-scan sonar imagery."
        status="YOLO Model Ready"
      />

      <section className="stats">
        <Stat icon="◎" title="Images Analyzed" value={lastFile ? "1" : "0"} />
        <Stat
          icon="◈"
          title="Objects Detected"
          value={lastFile ? lastResults.length : "0"}
        />
        <Stat icon="!" title="Anomalies Found" value="0" />
        <Stat
          icon="✓"
          title="Avg. Confidence"
          value={
            lastResults.length > 0 ? `${averageConfidence.toFixed(1)}%` : "—"
          }
        />
      </section>

      <SonarAnalyzer onAnalyzed={handleAnalyzed} />

      <div className="dashboard-action">
        <button className="primary-page-button" onClick={onOpenAnalysis}>
          Open Full Sonar Analysis
          <span>→</span>
        </button>
      </div>

      <section className="bottom-grid">
        <InfoCard
          number="01"
          title="Image Processing"
          text="Sonar imagery is prepared for AI-based analysis."
        />
        <InfoCard
          number="02"
          title="AI Detection"
          text="YOLO identifies and localizes objects in the image."
        />
        <InfoCard
          number="03"
          title="Decision Support"
          text="Detection results help operators investigate underwater areas."
        />
      </section>

      <footer>SonarShield • AI-Powered Underwater Object Detection</footer>
    </>
  );
}

/* =========================================================
   SONAR ANALYSIS PAGE
========================================================= */

function AnalysisPage({ onSaveHistory }) {
  return (
    <>
      <PageHeader
        eyebrow="AI DETECTION ENGINE"
        title="Sonar Analysis"
        subtitle="Upload a side-scan sonar image and analyze it using the trained YOLOv8 model."
        status="YOLOv8n Ready"
      />

      <SonarAnalyzer onAnalyzed={onSaveHistory} />

      <section className="analysis-info-grid">
        <div className="feature-page-card">
          <span>01</span>
          <h3>Upload</h3>
          <p>Select a side-scan sonar image from your survey data.</p>
        </div>
        <div className="feature-page-card">
          <span>02</span>
          <h3>YOLO Detection</h3>
          <p>
            The trained YOLO model identifies objects and calculates
            confidence.
          </p>
        </div>
        <div className="feature-page-card">
          <span>03</span>
          <h3>Results</h3>
          <p>
            Detection class, confidence and bounding-box information are
            returned.
          </p>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   REUSABLE SONAR ANALYZER
========================================================= */

function SonarAnalyzer({ onAnalyzed }) {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  /* UPLOAD */
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setImage(URL.createObjectURL(file));
    setImageName(file.name);
    setAnalyzed(false);
    setResults([]);
    setError("");
  };

  /* ANALYZE */
  const analyzeSonar = async () => {
    if (!selectedFile) {
      setError("Please select a sonar image first.");
      return;
    }

    setAnalyzing(true);
    setAnalyzed(false);
    setResults([]);
    setError("");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      console.log("Sending image to FastAPI...");

      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Backend request failed");
      }

      const data = await response.json();
      console.log("YOLO RESULT:", data);

      const detections = data.detections || [];
      setResults(detections);
      setAnalyzed(true);

      /* Save this analysis to Detection History. */
      onAnalyzed(selectedFile.name, detections);
    } catch (error) {
      console.error("Backend error:", error);
      setError(
        "Could not connect to the AI backend. Make sure FastAPI is running on port 8000."
      );
    } finally {
      setAnalyzing(false);
    }
  };

  const averageConfidence =
    results.length > 0
      ? (results.reduce((sum, item) => sum + item.confidence, 0) /
          results.length) *
        100
      : 0;

  return (
    <section className="workspace">
      {/* IMAGE INPUT */}
      <div className="panel upload-panel">
        <div className="panel-header">
          <div>
            <h2>Sonar Image Input</h2>
            <p>Upload a side-scan sonar image for analysis</p>
          </div>
        </div>

        {!image ? (
          <label className="upload-box">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />
            <div className="upload-icon">↑</div>
            <h3>Upload Sonar Image</h3>
            <p>
              Select a side-scan sonar image
              <br />
              or click to browse
            </p>
            <span className="file-info">JPG, JPEG, PNG</span>
          </label>
        ) : (
          <div className="image-container">
            <img src={image} alt="Uploaded sonar" className="sonar-image" />
            <div className="image-overlay">SONAR INPUT</div>
          </div>
        )}

        {image && (
          <div className="file-row">
            <div className="file-meta">
              <span className="file-label">Selected file</span>
              <strong>{imageName}</strong>
            </div>

            <div className="file-actions">
              <label className="change-btn">
                Change image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  hidden
                />
              </label>

              <button
                className="analyze-btn"
                onClick={analyzeSonar}
                disabled={analyzing}
              >
                {analyzing ? "Analyzing..." : "Analyze Sonar →"}
              </button>
            </div>
          </div>
        )}

        {error && <div className="backend-error">⚠ {error}</div>}
      </div>

      {/* RESULTS */}
      <div className="panel results-panel">
        <div className="panel-header">
          <div>
            <h2>Detection Results</h2>
            <p>AI-powered object identification</p>
          </div>
          {analyzed && <span className="complete">Analysis Complete</span>}
        </div>

        {!analyzed ? (
          <div className="empty-results">
            <div className="target-icon">◎</div>
            <h3>Waiting for analysis</h3>
            <p>
              Upload a side-scan sonar image and start analysis to view
              detected objects.
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="empty-results">
            <div className="target-icon">✓</div>
            <h3>No Objects Detected</h3>
            <p>
              YOLO analyzed the image, but no objects were detected above the
              model threshold.
            </p>
          </div>
        ) : (
          <div className="results fade-in">
            <div className="result-summary">
              <div>
                <span>Total Objects</span>
                <strong>{results.length}</strong>
              </div>
              <div>
                <span>Avg. Confidence</span>
                <strong>{averageConfidence.toFixed(1)}%</strong>
              </div>
            </div>

            {/* REAL YOLO RESULTS */}
            <div className="detection-list">
              {results.map((result, index) => (
                <Detection
                  key={index}
                  name={result.class}
                  confidence={`${(result.confidence * 100).toFixed(1)}%`}
                  count="1"
                />
              ))}
            </div>

            {/* BOUNDING BOX DATA */}
            <div className="box-data">
              <h3>Detection Coordinates</h3>
              {results.map((result, index) => (
                <div className="box-row" key={index}>
                  <span>{result.class}</span>
                  {Array.isArray(result.box) && (
                    <small>
                      X1: {result.box[0].toFixed(0)}
                      {"  "}Y1: {result.box[1].toFixed(0)}
                      {"  "}X2: {result.box[2].toFixed(0)}
                      {"  "}Y2: {result.box[3].toFixed(0)}
                    </small>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================================================
   DETECTION HISTORY PAGE
========================================================= */

function HistoryPage({ history }) {
  return (
    <>
      <PageHeader
        eyebrow="SONAR RECORDS"
        title="Detection History"
        subtitle="Review sonar images analyzed during the current application session."
        status={`${history.length} Analyses`}
      />

      {history.length === 0 ? (
        <div className="history-empty">
          <div className="history-icon">▣</div>
          <h2>No Detection History</h2>
          <p>Your analyzed sonar images will appear here.</p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((record) => (
            <div className="history-card" key={record.id}>
              <div className="history-number">◈</div>

              <div className="history-info">
                <h3>{record.fileName}</h3>
                <p>{record.date}</p>
              </div>

              <div className="history-count">
                <strong>{record.detections.length}</strong>
                <span>objects detected</span>
              </div>

              <div className="history-objects">
                {record.detections.length === 0 ? (
                  <span>No detections</span>
                ) : (
                  record.detections.map((item, index) => (
                    <span key={index} className="history-tag">
                      {item.class}
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* =========================================================
   SETTINGS PAGE
========================================================= */

function SettingsPage() {
  const [confidence, setConfidence] = useState(25);

  return (
    <>
      <PageHeader
        eyebrow="SYSTEM CONFIGURATION"
        title="Settings"
        subtitle="Configure the SONAR-SHIELD AI analysis environment."
        status="System Online"
      />

      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-icon">◈</div>
          <h2>AI Model</h2>
          <p>Current object detection model</p>
          <div className="setting-row">
            <span>Model</span>
            <strong>YOLOv8n</strong>
          </div>
          <div className="setting-row">
            <span>Framework</span>
            <strong>Ultralytics</strong>
          </div>
          <div className="setting-row">
            <span>Backend</span>
            <strong>FastAPI</strong>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-icon">✓</div>
          <h2>Detection Threshold</h2>
          <p>Display threshold for detections</p>
          <div className="threshold-value">{confidence}%</div>
          <input
            className="confidence-slider"
            type="range"
            min="10"
            max="90"
            value={confidence}
            onChange={(e) => setConfidence(Number(e.target.value))}
          />
          <div className="slider-labels">
            <span>10%</span>
            <span>90%</span>
          </div>
          <div className="settings-note">
            Current setting is displayed for interface configuration. Backend
            threshold changes require updating the YOLO API.
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-icon">⚙</div>
          <h2>System</h2>
          <p>SONAR-SHIELD system information</p>
          <div className="setting-row">
            <span>Frontend</span>
            <strong>React + Vite</strong>
          </div>
          <div className="setting-row">
            <span>API</span>
            <strong>FastAPI</strong>
          </div>
          <div className="setting-row">
            <span>Status</span>
            <strong className="online-text">Online</strong>
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function Stat({ icon, title, value }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div>
        <span>{title}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function InfoCard({ number, title, text }) {
  return (
    <div className="info-card">
      <div className="info-number">{number}</div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

function Detection({ name, confidence, count }) {
  return (
    <div className="detection">
      <div className="object-symbol">◈</div>

      <div className="object-info">
        <strong>{name}</strong>
        <div className="confidence-bar">
          <div className="confidence-fill" style={{ width: confidence }}></div>
        </div>
      </div>

      <div className="confidence">
        <strong>{confidence}</strong>
        <span>{count} detected</span>
      </div>
    </div>
  );
}

export default App;
