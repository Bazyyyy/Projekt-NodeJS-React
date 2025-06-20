#!/bin/bash

echo "Teardown startet... bitte warten."

PIDS=$(ps aux | grep node | grep Projekt-NodeJS-React | grep -v grep | awk '{print $2}')
if [ -n "$PIDS"]; then
    echo "Begin des Stops..."
    kill -9 $PIDS
else
    echo "Keine laufenden Prozesse gefunden."
fi

DB_FILE="backend/todo-backend/todo.db"
if [ -f "$DB_FILE" ]; then
    echo "Lösche Datenbank... bitte warten."
    rm "$DB_FILE"
fi

LOG_FILE="logs/server.log"
if [ -f "$LOG_FILE" ]; then
    echo "Entferne Logs... Bitte warten."
    rm logs/server.log
fi

echo "Teardown erfolgreich abgeschlossen. :)"