import Image from "next/image";

import styles from "./page.module.css";

export default function Landing() {
	return (
		<div className={styles.container}>
			<div className={styles.page}>
				<div className={styles.splash}>
					<h1>
						<em className={styles.name}>Noteworthy.</em> The generative AI
						revolution brought to an interface.
					</h1>
				</div>
				<p className={styles.info}>
					...an LLM-based text editor, with an intuitive and powerful
					graphical user interface. Employ an AI assistant to help you
					write without typing any prompts!
				</p>
				<p>Edit documents as normal:</p>
				<Image
					className={styles.image}
					src="/demos/screenshot-mode-edit.png"
					alt=""
					width={960}
					height={600}
				/>

				<p>
					Run a pre-engineered prompt on a text node, without typing
					anything:
				</p>
				<Image
					className={styles.image}
					src="/demos/screenshot-prompt-menu.png"
					alt=""
					width={960}
					height={600}
				/>
				<p>
					Combine, edit, rework, and improve the results of your prompts:
				</p>
				<Image
					className={styles.image}
					src="/demos/screenshot-prompt-response-single.png"
					alt=""
					width={960}
					height={600}
				/>
				<Image
					className={styles.image}
					src="/demos/screenshot-prompt-response-multiple.png"
					alt=""
					width={960}
					height={600}
				/>
				<p>
					View your documents without the clutter of the editor (and avoid
					accidentally making changes when reviewing):
				</p>
				<Image
					className={styles.image}
					src="/demos/screenshot-mode-view.png"
					alt=""
					width={960}
					height={600}
				/>
				<p className={styles.info}>
					And that&apos;s just the beginning! Check out everything
					that&apos;s to come:
				</p>
				<ol>
					<li>
						<strong>File upload</strong>
						<ul>
							<li>Copy file content</li>
							<li>Summarise file content</li>
							<li>Consolidate content from multiple files</li>
						</ul>
					</li>
					<li>
						<strong>Text highlighting</strong>
						<ul>
							<li>Re-write (in the style of X)</li>
							<li>Summarise</li>
							<li>Expand</li>
							<li>Create examples</li>
							<li>Draw diagram</li>
							<li>Generate code</li>
							<li>AI-generated custom suggestions, based on context</li>
							<li>Translate</li>
							<li>
								Generate todo list (steps required to complete
								something)
							</li>
							<li>
								Implement feedback (paste in the written feedback
								someone has given you)
							</li>
						</ul>
					</li>
					<li>
						<strong>Multimedia</strong>
						<ul>
							<li>Summarise audio (from links)</li>
							<li>Create images/diagrams of content</li>
							<li>LaTeX support via KaTeX or MathJax</li>
						</ul>
					</li>
					<li>
						<strong>UI</strong>
						<ul>
							<li>Movable, collapsible generated material</li>
							<li>Code syntax highlighting</li>
							<li>Search bar</li>
							<li>
								Drag and drop with option buttons to the side of nodes
							</li>
							<li>Add page columns to support different page layouts</li>
							<li>
								/create page where template document prompts can be
								selected, or multiple files uploaded to be
								summarised/based-from/etc
							</li>
							<li>Side panel for &quot;Research this content&quot;</li>
						</ul>
					</li>
					<li>
						<strong>Spell/grammar checker</strong>
					</li>
					<li>
						<strong>Customisation</strong>
						<ul>
							<li>
								Allow people to write their own prompts (in development,
								just use CSV/JSON)
							</li>
						</ul>
					</li>
					<li>
						<strong>Social media features</strong>
						<ul>
							<li>Profile pictures, friends, etc.</li>
							<li>Shareable, user-created prompt libraries.</li>
						</ul>
					</li>
				</ol>
			</div>
		</div>
	);
}
