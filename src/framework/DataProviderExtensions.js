// DataProviderExtensions.js
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
  const parent = React.use(DataExtensionsContext);

  const value = React.useMemo(
    () => ({
      derivedFields: {
        ...parent.derivedFields,
        ...derivedFields,
      },
      fieldInterceptors: {
        ...parent.fieldInterceptors,
        ...fieldInterceptors,
      },
    }),
    [parent, derivedFields, fieldInterceptors]
  );

  return (
    <DataExtensionsContext value={value}>
      {children}
    </DataExtensionsContext>
  );
}
