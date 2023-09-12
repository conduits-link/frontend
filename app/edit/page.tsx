"use client";

import React from "react";

import SlateEditor from "@/components/nodes/SlateEditor";

const initialValue = [
	{
		type: "item",
		children: [
			{
				type: "text",
				children: [{ text: "Main content" }],
			},
			{
				type: "container",
				children: [
					{
						type: "sub-item",
						children: [{ text: "Sub item 1" }],
					},
					{
						type: "sub-item",
						children: [{ text: "Sub item 2" }],
					},
				],
			},
		],
	},
	{
		type: "item",
		children: [
			{
				type: "text",
				children: [{ text: "Main content" }],
			},
			{
				type: "container",
				children: [
					{
						type: "sub-item",
						children: [{ text: "Sub item 1" }],
					},
				],
			},
		],
	},
];

const Edit = () => {
	return <SlateEditor initialValue={initialValue} />;
};

export default Edit;
