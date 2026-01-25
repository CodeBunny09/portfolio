#!/usr/bin/env bash

OUTPUT="codebase_dump.txt"
ROOT="frontend"

# Clean old dump
rm -f "$OUTPUT"

# Write header
echo "CODEBASE DUMP - $(date)" >> "$OUTPUT"
echo "Root: $ROOT" >> "$OUTPUT"
echo "----------------------------------------" >> "$OUTPUT"

# Find and dump files
find "$ROOT" \
  -type f \
  ! -path "*/node_modules/*" \
  ! -path "*/dist/*" \
  ! -path "*/.git/*" \
  ! -path "*/migrations/*" \
  ! -path "*/__pycache__/*" \
  ! -path "*/assets/*" \
  ! -name "*.pyc" \
  ! -name "*.sh" \
  ! -name "*.gif" \
  ! -name "/package-lock.json" \
  -print0 |
while IFS= read -r -d '' file; do
    echo "" >> "$OUTPUT"
    echo "===== FILE: $file =====" >> "$OUTPUT"
    echo "" >> "$OUTPUT"
    cat "$file" >> "$OUTPUT"
    echo "" >> "$OUTPUT"
done

echo "Dump complete → $OUTPUT"
