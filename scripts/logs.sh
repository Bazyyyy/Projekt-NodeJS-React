#!/bin/bash

LOG_FILE="logs/server.log"

if [ ! -f "$LOG_FILE" ]; then
    echo "Log-Datei existiert noch nicht: $LOG_FILE"
    echo "Starter Server um Logs zu generieren. ./scripts/run-backend.sh  oder ./scripts/dev.sh"
    exit 1
fi

tail -f "$LOG_FILE"