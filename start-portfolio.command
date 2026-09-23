#!/bin/bash
# Nithin Johnson Portfolio - 1-Click Launch Script for macOS
cd "$(dirname "$0")"
echo "========================================================"
echo "🕷️ Starting Nithin Johnson 3D Interactive Portfolio..."
echo "========================================================"
echo "Opening browser at http://localhost:8080"
python3 -m http.server 8080 &
SERVER_PID=$!
sleep 1
open http://localhost:8080
echo "Portfolio is running! Press Ctrl+C in this window to stop."
wait $SERVER_PID
