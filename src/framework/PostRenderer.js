// PostRenderer.js

import React from "react";
import Iterator from "./Iterator";
import { 
  getPlatformComponent 
} from "./PlatformComponentRegistry";
import { getJsonComponent } 
  from "./JsonComponentRegistry";
import {
  FieldMappingProvider
} from "./FieldMappingProvider";

export function renderNode(node) {
  if (!node) {
    return null;
  }

  if (node.type === "Text") {
    return node.value;
  }

  //
  // Platform component?
  //
  const ReactComponent = getPlatformComponent(node.type);

  if (ReactComponent) {
    return React.createElement(
      ReactComponent,
      node.props,
      renderChildren(node.children)
    );
  }

  //
  // JSON component?
  //
  const jsonComponent = getJsonComponent(node.type);

  if (jsonComponent) {
    return (
      <FieldMappingProvider
        fieldNameMapping={node.props}
      >
        {renderNode(jsonComponent)}
      </FieldMappingProvider>
    );
  }

  //
  // HTML element?
  //
  const isHtmlElement =
    node.type[0] === node.type[0].toLowerCase();

  if (isHtmlElement) {
    return React.createElement(
      node.type,
      node.props,
      renderChildren(node.children)
    );
  }

  console.warn(`Unknown component type: ${node.type}`);
  return null;
}

function renderChildren(children) {
  if (!children?.length) {
    return undefined;
  }

  if (
    children.length === 1 &&
    children[0].type === "Text"
  ) {
    return children[0].value;
  }

  return children.map((child, index) => (
    <React.Fragment key={index}>
      {renderNode(child)}
    </React.Fragment>
  ));
}