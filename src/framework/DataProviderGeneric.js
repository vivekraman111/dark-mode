"use client";

import React from "react";
import { produce } from "immer";
import { DataExtensionsContext } from "./DataProviderExtensions";

const DataContext = React.createContext(null);
const DataApiContext = React.createContext(null);

export default function DataProviderGeneric({ schema, children }) {
  const [data, setData] = React.useState(schema);

  const { fieldInterceptors } = React.use(DataExtensionsContext);

  const setField = React.useCallback(
    (path, valueOrUpdater) => {
      setData((current) => {
        return produce(current, (draft) => {
          const currentValue = getByPath(draft, null, path);

          let nextValue =
            typeof valueOrUpdater === "function"
              ? valueOrUpdater(currentValue)
              : valueOrUpdater;

          const interceptor = fieldInterceptors
            ? navigatePath(fieldInterceptors, path)
            : undefined;

          if (interceptor) {
            nextValue = interceptor(nextValue, draft, currentValue);
          }

          setByPath(draft, path, nextValue);
        });
      });
    },
    [fieldInterceptors]
  );

  const api = React.useMemo(
    () => ({
      setField,
    }),
    [setField]
  );

  return (
    <DataContext value={data}>
      <DataApiContext value={api}>{children}</DataApiContext>
    </DataContext>
  );
}

export function useData(path, options = {}) {
  const { includeSourceIndex = false } = options;

  const data = React.use(DataContext);
  const { derivedFields } = React.use(DataExtensionsContext);

  if (!data) {
    throw new Error("useData must be used inside DataProviderGeneric");
  }

  if (path == null) {
    return data;
  }

  if (Array.isArray(path)) {
    return path.map((p) => getByPath(data, derivedFields, p, options));
  }

  return getByPath(data, derivedFields, path, options);
}

export function useField(path, options = {}) {
  const { includeSourceIndex = false } = options;

  const value = useData(path, options);
  const { derivedFields } = React.use(DataExtensionsContext);
  const api = React.use(DataApiContext);

  if (!api) {
    throw new Error("useField must be used inside DataProviderGeneric");
  }

  const { setField } = api;

  const derivedField = derivedFields
    ? navigatePath(derivedFields, path)
    : undefined;

  if (derivedField?.editable && !derivedField.sourceField) {
    throw new Error(`Editable derived field "${path}" requires sourceField`);
  }

  const writePath = derivedField?.editable ? derivedField.sourceField : path;

  const setValue = React.useCallback(
    (valueOrUpdater) => {
      setField(writePath, valueOrUpdater);
    },
    [writePath, setField]
  );

  return [value, setValue];
}

function getByPath(data, derivedFields = null, path, options = {}) {
  const { includeSourceIndex = false } = options;

  let result = navigatePath(data, path);

  if (Array.isArray(result) && includeSourceIndex) {
    result = result.map((value, sourceIndex) => ({
      value,
      sourceIndex,
    }));
  }

  if (result === undefined && derivedFields) {
    const derivedField = navigatePath(derivedFields, path);
    const { sourceField, editable, fn } = derivedField;
    if (sourceField && editable && fn && includeSourceIndex) {
      const tracedData = produce(data, (draft) => {
        const sourceArray = navigatePath(draft, sourceField);

        const tracedArray = sourceArray.map((value, sourceIndex) =>
          attachMetadata(value, sourceIndex)
        );

        setByPath(draft, sourceField, tracedArray);
      });

      const tracedResult = fn(tracedData);

      result = tracedResult.map((tracedValue) => {
        const { value, metadata: sourceIndex } = stripMetadata(tracedValue);

        return {
          value,
          sourceIndex,
        };
      });
    } else if (includeSourceIndex) {
      result = fn(data).map((value, sourceIndex) => ({
        value,
        sourceIndex,
      }));
    } else {
      result = fn(data);
    }
  }

  if (result === undefined) {
    throw new Error(`Unknown path: ${path}`);
  }
  return result;
}

function navigatePath(obj, path) {
  return path.split(".").reduce((current, key) => current?.[key], obj);
}

function setByPath(obj, path, value) {
  const keys = path.split(".");

  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    if (!(key in current)) {
      throw new Error(`Unknown path: ${path}`);
    }

    current = current[key];
  }

  const finalKey = keys[keys.length - 1];

  if (!(finalKey in current)) {
    throw new Error(`Unknown path: ${path}`);
  }

  current[finalKey] = value;
}

const METADATA = Symbol("metadata");

export function attachMetadata(value, metadata) {
  if (value === null || value === undefined) {
    throw new Error("Cannot attach metadata to null or undefined");
  }

  let result = value;

  if (typeof value !== "object") {
    result = Object(value);
  }

  result[METADATA] = metadata;

  return result;
}

export function stripMetadata(value) {
  if (value === null || value === undefined) {
    return {
      value,
      metadata: undefined,
    };
  }

  const metadata = value[METADATA];

  if (typeof value === "object" && value.valueOf) {
    return {
      value: value.valueOf(),
      metadata,
    };
  }

  return {
    value,
    metadata,
  };
}
