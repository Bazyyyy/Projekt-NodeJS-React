#!/bin/bash
echo "Starte Entwicklungsmodus..."

( cd backend/todo-backend && npm install && npm run start ) & BACKEND_PID=$!
( cd frontend && npm install && npm run dev ) & FRONTEND_PID=$!

echo "Backend auf: $BACKEND_PID"
echo "Frontend auf: $FRONTEND_PID"

wait $BACKEND_PID $FRONTEND_PID

