// ServerRenderUtils.js

import React from "react";
import ServerIterator from "./ServerIterator";

import {
  getPlatformComponent,
} from "./PlatformComponentRegistry";

import {
  getJsonComponent,
} from "./JsonComponentRegistry";

export function createServerTree(
  node,
  api
) {
  if (!node) {
    return null;
  }

  //
  // Text node?
  //
  if (node.type === "Text") {
    return node.value;
  }

  //
  // ServerIterator?
  //
  if (node.type === "ServerIterator") {
    return (
      <ServerIterator
        api={api}
        {...node.props}
        childNodes={node.children}
      />
    );
  }

  //
  // Platform component?
  //
  const ReactComponent =
    getPlatformComponent(node.type);

  if (ReactComponent) {
    return React.createElement(
      ReactComponent,
      {
        ...node.props,
        api,
      },
      createServerChildren(
        node.children,
        api
      )
    );
  }

  //
  // JSON component?
  //
  const jsonComponent =
    getJsonComponent(node.type);

  if (jsonComponent) {
    const nextApi =
      api.withFieldMapping(
        node.props
      );

    return createServerTree(
      jsonComponent,
      nextApi
    );
  }

  //
  // HTML element?
  //
  const isHtmlElement =
    node.type[0] ===
    node.type[0].toLowerCase();

  if (isHtmlElement) {
    return React.createElement(
      node.type,
      node.props,
      createServerChildren(
        node.children,
        api
      )
    );
  }

  console.warn(
    `Unknown component type: ${node.type}`
  );

  return null;
}

export function createServerChildren(
  children,
  api
) {
  if (!children?.length) {
    return undefined;
  }

  if (
    children.length === 1 &&
    children[0].type === "Text"
  ) {
    return children[0].value;
  }

  return children.map(
    (child, index) => (
      <React.Fragment key={index}>
        {createServerTree(
          child,
          api
        )}
      </React.Fragment>
    )
  );
}