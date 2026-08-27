"use client";

import React from "react";
import DataProviderGeneric from 
  '../framework/DataProviderGeneric';
import DataProviderExtensions from "../framework/DataProviderExtensions";
import { useField, useData } from "../framework/DataProviderGeneric";
import { useIterationField, useIterationData } from "../framework/Iterator";
import { Sun, Moon, Zap } from "react-feather";
import { 
  registerPlatformComponents
} from "../framework/PlatformComponentRegistry";
import Cookies from "js-cookie";

export function ClientData({
  themeCssVars,
  selectedTheme,
  children
}) {
  const data = {
    themeCssVars,
    selectedTheme,

    themeIcons: new Map([
      ["light", Sun],
      ["dark", Moon],
      ["electric", Zap]
    ])
  };

  return (
    <DataProviderExtensions
      derivedFields={{
        selectedThemeCssVars: (data) =>
          data.themeCssVars[data.selectedTheme]
      }}
    >
      <DataProviderGeneric
        schema={data}
      >
        {children}
      </DataProviderGeneric>
    </DataProviderExtensions>
  );
}

export function IconToggle({
  className,
  field,
  iconMapField
}) {
  const [value, setValue] = useField(field);
  const iconMap = useData(iconMapField);

  const modes = [...iconMap.keys()];
  const IconComponent = iconMap.get(value);

  if (!IconComponent || modes.length === 0) {
    return null;
  }

  function toggle() {
    const currentIndex = modes.indexOf(value);
    const nextIndex = (currentIndex + 1) % modes.length;

    setValue(modes[nextIndex]);
  }

  return (
    <button
      className={className}
      onClick={toggle}
    >
      <IconComponent size="1.5rem" />
    </button>
  );
}

export function UpdateCookie({ field, cookie }) {
  const value = useData(field);

  React.useEffect(() => {
    if (value == null) {
      return;
    }

    Cookies.set(cookie, value);
  }, [value, cookie]);

  return null;
}

export function UpdateHtmlDataAttr({ field, attr }) {
  const value = useData(field);
  
  React.useEffect(() => {
    if (value == null) {
      return;
    }

    document.documentElement.dataset[attr] = value;
  }, [value, attr]);

  return null;
}

export function UpdateCssVars({ field, selector="html" }) {
  const cssVars = useData(field);

  React.useEffect(() => {
    const element = document.querySelector(selector);

    if (!element || !cssVars) {
      return;
    }

    for (const [name, value] of Object.entries(cssVars)) {
      element.style.setProperty(name, value);
    }
  }, [cssVars, selector]);

  return null;
}