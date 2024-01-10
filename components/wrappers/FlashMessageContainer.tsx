"use client";

import React from "react";

import { FlashMessageProvider } from "@/utils/flash";

const FlashMessageContainer = ({ children }: { children: React.ReactNode }) => {
	return <FlashMessageProvider>{children}</FlashMessageProvider>;
};

export default FlashMessageContainer;
