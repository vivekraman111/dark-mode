#!/bin/bash

set -e

# Create src if it doesn't exist
mkdir -p src

# Move app into src
if [ -d "app" ]; then
  mv app src/
fi

# Rename TypeScript app router files
if [ -f "src/app/layout.tsx" ]; then
  mv src/app/layout.tsx src/app/layout.js
fi

if [ -f "src/app/page.tsx" ]; then
  mv src/app/page.tsx src/app/page.js
fi

# Create directories
mkdir -p src/content
mkdir -p src/platform
mkdir -p src/framework

# Content files
touch src/content/sticker-pad-data.json
touch src/content/sticker-pad.css
touch src/content/sticker-pad.json

# Platform files
touch src/platform/client.js
touch src/platform/server.js

# Framework files
touch src/framework/DataProviderExtensions.js
touch src/framework/DataProviderGeneric.js
touch src/framework/Iterator.js
touch src/framework/PostRenderer.js

echo "Project structure created."