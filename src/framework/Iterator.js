"use client";

import React from "react";
import { useField } from "./DataProviderGeneric";

const IterationContext = React.createContext(null);

export function useIterationField() {
  const context = React.use(IterationContext);

  if (!context) {
    throw new Error("useIterationField must be used inside Iterator");
  }

  let { value, setValue } = context;

  return [value, setValue];
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
  const [renderedItems, setItems] = useField(dataArrField, {
    includeSourceIndex: true,
  });

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
