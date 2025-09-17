uvicorn server:app --reload --host 0.0.0.0 --port 8000
npx expo start --tunnel
 python -m uvicorn server:app --reload --host 0.0.0.0 --port 8000


ngrok http 8000
Forwarding   https://0042d7d666b8.ngrok-free.app -> http://localhost:8000    