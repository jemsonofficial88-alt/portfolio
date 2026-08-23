# Jemson C. Parcon — Portfolio Python Backend

A lightweight, modern REST API built with **Python 3** and **FastAPI** to power contact message processing, database persistence with SQLite, and live portfolio telemetry.

---

## ⚡ Features

- **FastAPI Framework**: High performance, automatic OpenAPI / Swagger interactive documentation.
- **SQLite Database**: Persistent local storage of inquiries and visitor page views.
- **Pydantic Validation**: Strict typing, data sanitization, and email formatting checks.
- **CORS Configured**: Allows cross-origin requests from your frontend.
- **Interactive API Docs**: Explore and test routes directly at `http://localhost:8000/docs`.

---

## 🛠️ Getting Started Locally

### 1. Install Dependencies
Make sure you have Python installed. Open your terminal in this `backend` directory and run:

```bash
pip install -r requirements.txt
```

### 2. Run the Development Server
```bash
python main.py
```
*Or using uvicorn directly:*
```bash
uvicorn main:app --reload --port 8000
```

### 3. Open Interactive API Documentation
Open your browser and navigate to:
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)
- **Health Check**: [http://localhost:8000/api/health](http://localhost:8000/api/health)

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API root welcome information |
| `GET` | `/api/health` | System health check and uptime status |
| `POST` | `/api/contact` | Submits and stores a new contact inquiry |
| `GET` | `/api/stats` | Returns live telemetry & roadmap data |
| `GET` | `/api/inquiries`| Lists recent message inquiries |

---

## 🚀 Free Deployment Guide (Render / Railway / Vercel)

1. **Push your code to GitHub**.
2. **On Render.com**:
   - Create a **New Web Service** connected to your repository.
   - Set **Root Directory** to `backend`.
   - Set **Build Command** to: `pip install -r requirements.txt`
   - Set **Start Command** to: `uvicorn main:app --host 0.0.0.0 --port $PORT`
3. Your backend will have a live public HTTPS URL (e.g. `https://jemson-portfolio-api.onrender.com`).

