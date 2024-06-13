import React from "react";

const ListItem = (props: any) => {
	const childrenArray = React.Children.toArray(props.children);

	return <li {...props.attributes}>{childrenArray}</li>;
};

export default ListItem;
