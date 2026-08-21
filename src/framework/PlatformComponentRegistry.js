// PlatformComponentRegistry.js

const registry = Object.create(null);

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