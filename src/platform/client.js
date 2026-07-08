"use client";

import React from 'react';
import { useField, useData } from "../framework/DataProviderGeneric";
import { useIterationField } from "../framework/Iterator";


export function Result({ field, className }) {
  const value = useData(field);

  return <pre className={className}>
  	{`${field}: ${JSON.stringify(value, null, 4)}`}
  </pre>;
}