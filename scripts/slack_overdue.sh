#!/bin/bash

DB="backend/todo-backend/todo.db"
WEBHOOK_URL="https://hooks.slack.com/services/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"

OVERDUE=$(sqlite3 "$DB" "
SELECT id || '. ' || title || ' (! bis: ' || deadline || ')'
FROM tasks
WHERE deadline < DATE('now') AND completed = 0;
")

if [ -z "$OVERDUE" ]; then
    echo "Keine überfälligen Aufgaben"
    exit 0
fi

MESSAGE="*Fällige Todos:*$'\n'$OVERDUE"

curl -s -X POST -H "Content-type: application/json" \
    --data "$(jq -n --arg text "$MESSAGE" '{text: $text}')" \
    "$WEBHOOK_URL"

echo "Überfällige Aufgaben an Slack gesendet."