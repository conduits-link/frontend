import styles from "./IdeaContainer.module.css";

const IdeaContainer = (props: any) => {
	return <div className={styles.element}>{props.children}</div>;
};

export default IdeaContainer;
