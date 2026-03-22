Used Car Price Prediction Project

This project predicts the selling price of used cars using Machine Learning.

Dataset:
CarDekho Used Car Dataset

Technologies:
Python
Pandas
Scikit-learn
FastAPI
React (Vite)
Tailwind CSS
Streamlit (legacy)

Steps:

## 1) Train model (optional)
python src/train_model.py

## 2) Run backend API
Install dependencies:

python -m pip install -r requirements.txt

Start API:

python -m uvicorn backend.main:app --reload --port 8000

Health check:

http://127.0.0.1:8000/health

## 3) Run frontend (React)
In a new terminal:

cd frontend
npm install
npm run dev

Frontend will run at:

http://127.0.0.1:5173

Pages:
- Home: /
- Predict: /predict
- About: /about
- Contact: /contact

### Environment
Optionally set the API URL for the frontend:

Copy `frontend/.env.example` to `frontend/.env` and edit `VITE_API_URL`.

## Legacy Streamlit UI (optional)
streamlit run app.py