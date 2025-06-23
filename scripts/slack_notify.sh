#!/bin/bash

WEBHOOK_URL="https://hooks.slack.com/services/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"
MESSAGE="$1"

payload=$(jq -n --arg msg "$MESSAGE" '{text: $text}')

curl -s -X POST -H "Content-type: application/json" \
    --data "$payload" "$WEBHOOK_URL"

