
#!/bin/bash

echo "Starte Healthcheck... bitte warten."

BACKEND_URL="http://localhost:5050/api/health"
FRONTEND_URL="http://localhost:5173"

check_url() {
  local url=$1
  local name=$2
  local status

  status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  if [ "$status" = "200" ]; then
    echo "✅ $name Healthy"
    return 0
  else
    echo "❌ $name Down – $url (HTTP $status)"
    return 1
  fi
}

check_url "$BACKEND_URL" "Backend"
BACKEND_STATUS=$?

check_url "$FRONTEND_URL" "Frontend"
FRONTEND_STATUS=$?

if [ $BACKEND_STATUS -ne 0 ] || [ $FRONTEND_STATUS -ne 0 ]; then
  exit 1
else
  exit 0
fi
