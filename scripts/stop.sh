#!/bin/bash

echo "Stoppe Back und Frontend.."

PIDS=$(ps aux | grep node | grep Projekt-NodeJS-React | grep -v grep | awk '{print $2}')

if [ -z "$PIDS" ]; then
    echo "Keine laufenden Prozesse gefunden."
else
    echo " Beende Prozesse>:"
    echo "$PIDS"
    kill -9 $PIDS
    echo "Prozesse beendet."
fi
