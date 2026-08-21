// FieldMappingProvider.js
"use client";

import React from "react";

export const FieldMappingContext = React.createContext({});

export function FieldMappingProvider({
  fieldNameMapping = {},
  children,
}) {
  return (
    <FieldMappingContext value={fieldNameMapping}>
      {children}
    </FieldMappingContext>
  );
}

export function useFieldMapping() {
  return React.use(FieldMappingContext);
}

export function resolveFieldName(path, fieldNameMapping) {
  if (path == null) {
    return path;
  }

  const dotIndex = path.indexOf(".");

  if (dotIndex === -1) {
    return fieldNameMapping[path] ?? path;
  }

  const firstSegment = path.slice(0, dotIndex);
  const remainder = path.slice(dotIndex);

  return (
    (fieldNameMapping[firstSegment] ?? firstSegment) +
    remainder
  );
}