#!/bin/env bash

echo "Prüfe zustand der Ports..:
"
for PORT in 5050 5173; do
    PIDS=$(ss -ltnp "sport = :$PORT" 2>/dev/null | grep -oP 'pid=\K[0-9]+')
    if [ -n "$PIDS" ]; then
        echo "Port $PORT ist belegt (PID: $PIDS) - wird beendet..."
        for PID in $PIDS; do 
            kill -9 "$PID"
        done
    else
        echo "Port $PORT ist frei."
    fi
done

echo "Starte Entwicklungsmodus..."

( cd backend/todo-backend && npm install && npm run start ) & BACKEND_PID=$!
( cd frontend && npm install && npm run dev ) & FRONTEND_PID=$!

echo "Backend auf: $BACKEND_PID"
echo "Frontend auf: $FRONTEND_PID"

wait $BACKEND_PID $FRONTEND_PID

