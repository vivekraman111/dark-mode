// JsonComponentRegistry.js

const registry = Object.create(null);

export function registerJsonComponents(components) {
  for (const [name, component] of Object.entries(components)) {
    if (registry[name]) {
      throw new Error(
        `JSON component "${name}" is already registered.`
      );
    }

    registry[name] = component;
  }
}

export function getJsonComponent(name) {
  return registry[name];
}