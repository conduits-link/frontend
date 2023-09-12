import React, { useContext } from "react";

interface editorContextValue {
	content: string;
	setContent: React.Dispatch<React.SetStateAction<string>>;
}

const EditorContext = React.createContext<editorContextValue>({
	content: "",
	setContent: () => {},
});

const EditorContextProvider = ({
	content,
	setContent,
	children,
}: {
	content: string;
	setContent: React.Dispatch<React.SetStateAction<string>>;
	children: React.ReactNode;
}) => {
	return (
		<EditorContext.Provider value={{ content, setContent }}>
			{children}
		</EditorContext.Provider>
	);
};

const useEditorContext = (): editorContextValue => {
	const context = useContext(EditorContext);

	if (!context) {
		throw new Error(
			"useEditorContext must be used within an EditorContextProvider"
		);
	}

	return context;
};

export { EditorContextProvider, useEditorContext };
