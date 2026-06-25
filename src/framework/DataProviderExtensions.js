"use client";

import React from "react";

export const DataExtensionsContext = React.createContext({
  derivedFields: {},
  fieldInterceptors: {},
});

export default function DataProviderExtensions({
  derivedFields = {},
  fieldInterceptors = {},
  children,
}) {
  const value = React.useMemo(
    () => ({
      derivedFields,
      fieldInterceptors,
    }),
    [derivedFields, fieldInterceptors]
  );

  return (
    <DataExtensionsContext value={value}>{children}</DataExtensionsContext>
  );
}
