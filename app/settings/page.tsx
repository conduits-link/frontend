"use client";

import { useRef } from "react";

import { setStoreLocation, getStoreLocation } from "@/utils/storage";

export default function Settings() {
	const storeLocationElementRef = useRef<HTMLInputElement>(null);

	return (
		<div>
			<input
				type="text"
				id="storeLocation"
				placeholder="Store Location"
				defaultValue={getStoreLocation()}
				ref={storeLocationElementRef}
			/>
			<button
				onClick={() =>
					setStoreLocation(storeLocationElementRef.current!.value)
				}
			>
				Set location
			</button>
		</div>
	);
}
