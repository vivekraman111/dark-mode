"use client";

import React from 'react';
import { useField, useData } from "../framework/DataProviderGeneric";
import { useIterationField } from "../framework/Iterator";

export function Item({className}) {
	const [item, _] = useIterationField();

	return (
		<div className={className}>
			{item.label}
		</div>
	)
}

export function AddItem({itemArrField, className}) {
	const [items, setItems] = useField(itemArrField);
	const [draftItem, setDraftItem] = React.useState("");
	const id = React.useId();

	return (
		<form className={className}
			onSubmit={event => {
				event.preventDefault();
				setItems([...items, {
					id: crypto.randomUUID(),
					label: draftItem,
				}]);
				setDraftItem("");
			}}
		>
			<label
				htmlFor={id}
				className="add-item-label"
			>
				New item:
			</label>
			<div className="add-item-row">
				<input
					value={draftItem}
					onChange={event => setDraftItem(event.target.value)}
				/>
				<button>Add</button>
			</div>
		</form>
	)
}

export function Result({ field, className }) {
  const value = useData(field);

  return <pre className={className}>
  	{`${field}: ${JSON.stringify(value, null, 4)}`}
  </pre>;
}