// ServerIterator.js

import React from "react";

import {
  createServerChildren,
} from "./ServerRenderUtils";

export default function ServerIterator({
  api,
  dataArrField,
  childNodes,
}) {
  //
  // Materialise the array from the global model.
  //
  const items = api.useData(
    dataArrField
  );

  if (!Array.isArray(items)) {
    throw new Error(
      `"${dataArrField}" is not an array`
    );
  }

  return items.map((item, index) => {
    const iterationApi =
      api.withIteration(item);

    const key =
      item &&
      typeof item === "object" &&
      item.id != null
        ? item.id
        : index;

    return (
      <React.Fragment key={key}>
        {createServerChildren(
          childNodes,
          iterationApi
        )}
      </React.Fragment>
    );
  });
}