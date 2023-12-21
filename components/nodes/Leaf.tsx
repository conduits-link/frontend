const Leaf = (props: any) => {
	if (props.leaf.bold) {
		return <strong {...props.attributes}>{props.children}</strong>;
	}

	if (props.leaf.italic) {
		return <em {...props.attributes}>{props.children}</em>;
	}
};

export default Leaf;
