#!/bin/bash

# Output file
OUTPUT="backend_code_dump.txt"

# Clean previous dump
rm -f "$OUTPUT"
touch "$OUTPUT"

echo "Backend Code Dump" >> "$OUTPUT"
echo "Generated on: $(date)" >> "$OUTPUT"
echo "========================================" >> "$OUTPUT"
echo "" >> "$OUTPUT"

# Directories & files to include
INCLUDE_PATHS=(
  "backend"
  "portfolio"
  "manage.py"
)

# Patterns to exclude
EXCLUDES=(
  "__pycache__"
  "media"
  "db.sqlite3"
  "*.pyc"
)

# Convert excludes to find args
EXCLUDE_ARGS=""
for pattern in "${EXCLUDES[@]}"; do
  EXCLUDE_ARGS+=" ! -path '*$pattern*'"
done

# Dump files
for path in "${INCLUDE_PATHS[@]}"; do
  if [ -e "$path" ]; then
    find "$path" -type f \
      \( -name "*.py" -o -name "*.txt" -o -name "*.md" \) \
      $EXCLUDE_ARGS | sort | while read -r file; do
        echo "" >> "$OUTPUT"
        echo "========================================" >> "$OUTPUT"
        echo "FILE: $file" >> "$OUTPUT"
        echo "========================================" >> "$OUTPUT"
        echo "" >> "$OUTPUT"
        sed 's/\t/    /g' "$file" >> "$OUTPUT"
      done
  fi
done

echo "" >> "$OUTPUT"
echo "========== END OF BACKEND CODE DUMP ==========" >> "$OUTPUT"

echo "✔ Backend code dumped to $OUTPUT"

