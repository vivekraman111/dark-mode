import React from "react";
import {
  
} from "../platform/client";
import Iterator from "./Iterator";

const componentMap = {

};

export function renderNode(node) {
  if (!node) return null;

  if (node.type === "Text") {
    return node.value;
  }

  let children;

  if (
    node.children?.length === 1 &&
    node.children[0].type === "Text"
  ) {
    children = node.children[0].value;
  } else {
    children = node.children?.map((child, index) => (
      <React.Fragment key={index}>
        {renderNode(child)}
      </React.Fragment>
    ));
  }

  let Component = componentMap[node.type];

  const isHtmlElement =
  node.type[0] === node.type[0].toLowerCase();

  if (!Component) {
    if (isHtmlElement) {
      Component = node.type;
    } else {
      console.warn(`Unknown component type: ${node.type}`);
      return null;
    }
  }

  return React.createElement(
    Component,
    node.props,
    children
  );
}
