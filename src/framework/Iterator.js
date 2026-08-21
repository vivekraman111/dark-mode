// Iterator.js
"use client";

import React from "react";
import { useField, navigatePath } 
  from "./DataProviderGeneric";

const IterationContext = React.createContext(null);

export function useIterationField() {
  const context = React.use(IterationContext);

  if (!context) {
    throw new Error("useIterationField must be used inside Iterator");
  }

  let { value, setValue } = context;

  return [value, setValue];
}

export function useIterationData(path) {
  const context = React.use(IterationContext);

  if (!context) {
    throw new Error(
      "useIterationData must be used inside Iterator"
    );
  }

  if (path == null) {
    return context.value;
  }

  return navigatePath(context.value, path);
}

export function useIterationIndex() {
  const context = React.use(IterationContext);

  if (!context) {
    throw new Error("useIterationIndex must be used inside Iterator");
  }

  let { index } = context;

  return index;
}

export default function Iterator({ dataArrField, children }) {
  const fieldHandle = useField(dataArrField, {
    includeSourceIndex: true,
  });

  const iterationContext = React.use(IterationContext);

  let renderedItems;
  let setItems;

  if (dataArrField === undefined) {
    if (!iterationContext) {
      throw new Error(
        "Iterator without dataArrField must be nested inside another Iterator"
      );
    }

    renderedItems = iterationContext.value.map(
      (value, sourceIndex) => ({
        value,
        sourceIndex,
      })
    );

    setItems = iterationContext.setValue;
  } else {
    [renderedItems, setItems] = fieldHandle;
  }

  return renderedItems.map(({ value, sourceIndex }, index) => {
  
    const setValue = (valueOrUpdater) => {
      setItems((items) => {
        const next = [...items];

        next[sourceIndex] =
          typeof valueOrUpdater === "function"
            ? valueOrUpdater(next[sourceIndex])
            : valueOrUpdater;

        return next;
      });
    };

    const key =
      value &&
      typeof value === "object" &&
      value.id != null
        ? value.id
        : sourceIndex;

    return (
      <IterationContext
        key={key}
        value={{
          value,
          setValue,
          index,
        }}
      >
        {children}
      </IterationContext>
    );
  });
}
