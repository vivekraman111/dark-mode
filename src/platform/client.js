"use client";

import React from 'react';
import { useField, useData } from "../framework/DataProviderGeneric";
import { useIterationField } from "../framework/Iterator";
import { getSticker } from "../platform/sticker-data";

export function StickerPad(
	{stickersField, className, children}
) {
	const [stickers, setStickers] = useField(stickersField);
	
	return (
		<div
			className={className}
			onClick={(event) => {
				const randomSticker = getSticker();
				setStickers(
					[
						...stickers,
						{
							...randomSticker,
							id: crypto.randomUUID(),
							x: event.clientX,
							y: event.clientY,
						}
					]
				)
			}}>
			{children}
		</div>
	)
}

export function Sticker({stickersField, className}) {
	const [sticker, _] = useIterationField();
	const [stickers, setStickers] = useField(stickersField); 

	return (
		<button
			className={className}
			style={{
				"--x": sticker.x + "px",
				"--y": sticker.y + "px",
				"--width": sticker.width + "px",
				"--height": sticker.height + "px",
			}}
			onContextMenu={(event) => {
				event.preventDefault();
				setStickers(stickers.filter(({id}) => sticker.id !== id))
			}}
			onKeyDown={(event) => {
				if(event.key === "Delete" ||
					 event.key === "Backspace") {
					setStickers(stickers.filter(({id}) => sticker.id !== id))
				}
			}}
		>
			<img
				src={sticker.src}
				alt={sticker.alt}
			/>
		</button>
	)
}

export function Result({ field, className }) {
  const value = useData(field);

  return <pre className={className}>
  	{`${field}: ${JSON.stringify(value, null, 4)}`}
  </pre>;
}