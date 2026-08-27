// PlatformComponentRegistry.js

const registry = Object.create(null);
const serverComponents = Object.create(null);

export function registerPlatformComponents(components) {
  for (const [name, component] of Object.entries(components)) {
    if (registry[name]) {
      throw new Error(
        `Platform component "${name}" is already registered.`
      );
    }

    registry[name] = component;
  }
}

export function getPlatformComponent(type) {
  return registry[type];
}

export function registerServerComponents(components) {
  for (const [name, component] of Object.entries(components)) {
    if (serverComponents[name]) {
      throw new Error(
        `Server component "${name}" is already registered.`
      );
    }

    serverComponents[name] = component;
  }
}

export function getServerComponent(type) {
  return serverComponents[type];
}