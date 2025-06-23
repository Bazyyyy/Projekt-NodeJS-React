#!/bin/bash

BACKEND_URL="http://localhost:5050/api/health"
FRONTEND_URL="http://localhost:5173"
LOGFILE="logs/monitor.log"

mkdir -p logs

echo "Starte Monitoring 🕊️... (ctr+c to close)"

while true; do
    TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
    STATUS="OK"

    for TARGET in \
        "Backend;$BACKEND_URL"\
        "Frontend;$FRONTEND_URL"
    do
        NAME="${TARGET%%;*}"
        URL="${TARGET##*;}"
        CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL")

        if [[ "$CODE" != "200" ]]; then
            STATUS="DOWN"
            echo "$TIMESTAMP 🚩 $NAME UNREACHABLE (HTTP $CODE) - $URL" | tee -a "$LOGFILE"
        else
            echo "$TIMESTAMP 🟢 $NAME OK (HTTP 200)" >> "$LOGFILE"
        fi
    done

    if [[ "$STATUS" == "DOWN" ]]; then
        echo " $(date +"%H:%M:%S") - Mindestens ein Dienst ist offline."
        ./scripts/slack_notify.sh "$TIMESTAMP: Mindestens ein Dienst ist offline."
    fi

    sleep 60
done
