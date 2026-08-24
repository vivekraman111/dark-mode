export function createCssVars(theme) {
    const cssVars = {};
  
    for (const [group, values] of Object.entries(theme)) {
      for (const [name, value] of Object.entries(values)) {
        cssVars[`--${group}-${name}`] = value;
      }
    }
  
    return cssVars;
  }