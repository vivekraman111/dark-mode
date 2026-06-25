import React from "react";
import {
  StickerPad,
  Sticker
} from "../platform/client";
import Iterator from "./Iterator";

const componentMap = {
  StickerPad,
  Sticker,
  Iterator,
};

export function renderNode(node) {
  if (!node) return null;

  if (node.type === "Text") {
    return node.value;
  }

  const Component = componentMap[node.type];

  if (!Component) {
    console.warn(`Unknown component type: ${node.type}`);
    return null;
  }

  let children;

  if (node.children?.length === 1 && node.children[0].type === "Text") {
    children = node.children[0].value;
  } else {
    children = node.children?.map((child, index) => (
      <React.Fragment key={index}>{renderNode(child)}</React.Fragment>
    ));
  }

  return <Component {...node.props}>{children}</Component>;
}
