#!/bin/bash
# flatten.sh — collect project source + metadata for debugging
# Excludes node_modules, dist, vite cache, git, lockfiles, etc.

OUTPUT="flattened_project.txt"

# 1. Metadata
{
  echo "====== PROJECT METADATA ======"
  echo "Timestamp: $(date)"
  echo "Node: $(node -v 2>/dev/null || echo 'not installed')"
  echo "npm: $(npm -v 2>/dev/null || echo 'not installed')"
  echo "npx tailwindcss: $(npx tailwindcss -v 2>/dev/null || echo 'not installed')"
  echo "Vite: $(npx vite --version 2>/dev/null || echo 'not installed')"
  echo "OS: $(uname -a)"
  echo "Working directory: $(pwd)"
  echo
  echo "====== package.json ======"
  cat package.json 2>/dev/null || echo "no package.json"
  echo
  echo "====== postcss.config.js ======"
  cat postcss.config.js 2>/dev/null || echo "no postcss.config.js"
  echo
  echo "====== tailwind.config.js ======"
  cat tailwind.config.js 2>/dev/null || echo "no tailwind.config.js"
  echo
} > "$OUTPUT"

# 2. Flatten source/config files (skip junk & deps)
echo "====== PROJECT FILES ======" >> "$OUTPUT"

find . \
  -type d \( -name node_modules -o -name .git -o -name dist -o -name .vite -o -name coverage \) -prune -false \
  -o -type f \
  \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.css" -o -name "*.html" -o -name "*.json" -o -name "*.md" \) \
  ! -name "package-lock.json" \
  ! -name "yarn.lock" \
  ! -name "pnpm-lock.yaml" \
  ! -name "$OUTPUT" \
  | while read -r file; do
    echo "====== $file ======" >> "$OUTPUT"
    cat "$file" >> "$OUTPUT"
    echo -e "\n" >> "$OUTPUT"
  done

echo "✅ Flattened project written to $OUTPUT"

