// ServerRenderer.js

import React from "react";

import {
  createServerTree,
} from "./ServerRenderUtils";

export default function ServerRenderer({
  tree,
  api,
}) {
  return createServerTree(
    tree,
    api
  );
}