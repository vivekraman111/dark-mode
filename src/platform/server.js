// server.js

import React from "react";
import clsx from "clsx";
import { 
  registerPlatformComponents
} from "../framework/PlatformComponentRegistry";
import { ClientData } from "./client";
import { createCssVars } from "../helpers"
import {
  IconToggle,
  UpdateCookie,
  UpdateHtmlDataAttr,
  UpdateCssVars,
} from "./client";

function ClientDataWrapper({
  api,
  children
}) {
  const themeCssVars = Object.fromEntries(
    Object.entries(api.useData("themes")).map(
      ([theme, values]) => [
        theme,
        createCssVars(values)
      ]
    )
  );

  const selectedTheme =
    api.useData("initialTheme");

  return (
    <ClientData
      themeCssVars={themeCssVars}
      selectedTheme={selectedTheme}
    >
      {children}
    </ClientData>
  );
}

export function Box({
  api,
  as = "div",
  className,
  children,
  fieldName,
  fieldNameIterator,
  attrsFieldName,
  attrsFieldNameIterator,
  cssVarsFieldName,
  cssVarsFieldNameIterator,
  ...props
}) {
  let content = children;
  let attrs;
  let cssVars;

  if (fieldName) {
    content = api.useData(fieldName);
  }

  if (fieldNameIterator) {
    content = api.useIterationData(fieldNameIterator);
  }

  if (attrsFieldName) {
    attrs = api.useData(attrsFieldName);
  }

  if (attrsFieldNameIterator) {
    attrs = api.useIterationData(attrsFieldNameIterator);
  }

  if (cssVarsFieldName) {
    cssVars = api.useData(cssVarsFieldName);
  }

  if (cssVarsFieldNameIterator) {
    cssVars = api.useIterationData(cssVarsFieldNameIterator);
  }

  const elementProps = {
    ...props,
    ...attrs,
    className,
    style: cssVars,
  };

  return React.createElement(
    as,
    elementProps,
    content
  );
}

function Link({
  api,
  href,
  className,
  children
}) {
  return (
    <a
      href={href}
      className={className}
    >
      {children}
    </a>
  );
}

function Children({ api, fieldName }) {
  return api.useData(fieldName);
}

registerPlatformComponents({
  ClientDataWrapper, Box, Link, Children,
  IconToggle,
  UpdateCookie,
  UpdateHtmlDataAttr,
  UpdateCssVars,
});