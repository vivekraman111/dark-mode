// ServerDataApi.js

export default class ServerDataApi {
    constructor({
      data,
      derivedFields = {},
      iterationStack = [],
      fieldMappings = [],
    }) {
      this.data = data;
      this.derivedFields = derivedFields;
      this.iterationStack = iterationStack;
      this.fieldMappings = fieldMappings;
    }
  
    useData(path) {
      const resolvedPath = this.resolvePath(path);
  
      if (resolvedPath == null) {
        return this.data;
      }
  
      if (Array.isArray(resolvedPath)) {
        return resolvedPath.map((p) => this.getByPath(p));
      }
  
      return this.getByPath(resolvedPath);
    }
  
    useIterationData(path) {
      const iterationData =
        this.iterationStack[this.iterationStack.length - 1];
  
      if (iterationData === undefined) {
        throw new Error(
          "useIterationData called outside an Iterator"
        );
      }
  
      if (path == null) {
        return iterationData;
      }
  
      return navigatePath(iterationData, path);
    }
  
    useNestedIterationData(level, path) {
      const iterationData = this.iterationStack[level];
  
      if (iterationData === undefined) {
        throw new Error(
          `No iteration data at level ${level}`
        );
      }
  
      if (path == null) {
        return iterationData;
      }
  
      return navigatePath(iterationData, path);
    }
  
    resolvePath(path) {
      if (path == null) {
        return path;
      }
  
      if (Array.isArray(path)) {
        return path.map((p) => this.resolvePath(p));
      }
  
      const segments = path.split(".");
  
      let field = segments[0];
  
      for (
        let i = this.fieldMappings.length - 1;
        i >= 0;
        i--
      ) {
        const mapping = this.fieldMappings[i];
  
        if (
            mapping &&
            Object.hasOwn(mapping, field)
        ) {
          field = mapping[field];
        }
      }
  
      segments[0] = field;
  
      return segments.join(".");
    }
  
    getByPath(path) {
      let result = navigatePath(this.data, path);
  
      if (
        result === undefined &&
        this.derivedFields
      ) {
        let derivedField = navigatePath(
          this.derivedFields,
          path
        );
  
        if (derivedField !== undefined) {
          if (
            typeof derivedField === "function"
          ) {
            derivedField = {
              fn: derivedField,
            };
          }
  
          result = derivedField.fn(this.data);
        }
      }
  
      if (result === undefined) {
        throw new Error(
          `Unknown path: ${path}`
        );
      }
  
      return result;
    }
  
    withFieldMapping(fieldMapping) {
      return new ServerDataApi({
        data: this.data,
        derivedFields: this.derivedFields,
        iterationStack: this.iterationStack,
        fieldMappings: [
          ...this.fieldMappings,
          fieldMapping,
        ],
      });
    }
  
    withIteration(iterationData) {
      return new ServerDataApi({
        data: this.data,
        derivedFields: this.derivedFields,
        iterationStack: [
          ...this.iterationStack,
          iterationData,
        ],
        fieldMappings: this.fieldMappings,
      });
    }
  }
  
  export function navigatePath(obj, path) {
    return path
      .split(".")
      .reduce(
        (current, key) => current?.[key],
        obj
      );
  }