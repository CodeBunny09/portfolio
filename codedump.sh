#!/bin/bash

OUTPUT_FILE="frontend_code_dump.txt"
> "$OUTPUT_FILE"

FILES=(
  "frontend/src/App.jsx"
  "frontend/src/main.jsx"
  "frontend/src/index.css"
  "frontend/tailwind.config.js"
  "frontend/vite.config.js"
  "frontend/src/pages/Home.jsx"
  "frontend/src/components/layout/Navbar.jsx"
  "frontend/src/components/layout/ParticlesBackground.jsx"
  "frontend/src/components/sections/WorkCarousel.jsx"
  "frontend/src/components/ui/ProjectCard.jsx"
  "frontend/src/hooks/useAPI.js"
)

FILES+=("frontend/package.json")


for FILE in "${FILES[@]}"; do
  echo "===============================" >> "$OUTPUT_FILE"
  echo "FILE: $FILE" >> "$OUTPUT_FILE"
  echo "===============================" >> "$OUTPUT_FILE"
  echo "" >> "$OUTPUT_FILE"

  if [ -f "$FILE" ]; then
    cat "$FILE" >> "$OUTPUT_FILE"
  else
    echo "❌ FILE NOT FOUND" >> "$OUTPUT_FILE"
  fi

  echo "" >> "$OUTPUT_FILE"
  echo "" >> "$OUTPUT_FILE"
done

echo "✅ Frontend code dumped into $OUTPUT_FILE"
