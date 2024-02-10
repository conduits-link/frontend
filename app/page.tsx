import Image from "next/image";

import styles from "./page.module.css";

export default function Landing() {
	return (
		<div className={styles.container}>
			<div className={styles.page}>
				<div className={styles.splash}>
					<h1>
						<em className={styles.name}>Conduit.</em> The generative AI
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
				<ol id="features">
					<li>
						We&apos;re open-source, which means no propriety formats!
						(conduit is built on markdown for storing and editing text).
					</li>
					<li>
						A completely customisable and modular system to configure
						generative AI agents for different media.
					</li>
					<li>
						Run pre-engineered prompts (on a per-document, per-node, or
						per-selection basis) in rich text files, such as:
						<ul>
							<li>Summarise</li>
							<li>Expand</li>
							<li>Rewrite (in style of...)</li>
							<li>Create examples</li>
							<li>Create practice questions/answers</li>
							<li>Write code</li>
							<li>Translate</li>
							<li>Create todos (steps for accomplishing something)</li>
							<li>Implement received feedback</li>
							<li>Create/customise your own!</li>
						</ul>
					</li>
					<li>
						Interaction modes:
						<ul>
							<li>
								<strong>Edit:</strong> Add, update, and remove content
								with LLM-based text completion.
							</li>
							<li>
								<strong>Review:</strong> Interact and ask questions
								about content (to strengthen your understanding, or test
								your knowledge), alongside a spelling and grammar
								checker.
							</li>
							<li>
								<strong>Present:</strong> View an uneditable version of
								the content you have produced, without an interface
								getting in the way.
							</li>
						</ul>
					</li>
					<li>
						Intuitive interface that provides smooth user experience:
						<ul>
							<li>Movable, collapsible generated material.</li>
							<li>Drag and drop to reorder and organise content.</li>
						</ul>
					</li>
					<li>
						File upload:
						<ul>
							<li>
								Run prompts and ask questions about any (part of a)
								file.
							</li>
							<li>Consolidate or summarise multiple files.</li>
						</ul>
					</li>
					<li>
						Automatically generate notes from, or summarise a conversation
						had with an LLM.
					</li>
					<li>
						Collaboration with other users, such as:
						<ul>
							<li>Edit the same content.</li>
							<li>
								Use someone else&apos;s document as a base for your new
								document.
							</li>
						</ul>
					</li>
					<li>
						Create automations and &apos;work forces&apos; to automate
						content production through the use of LLMs interacting with
						each other, such as:
						<ul>
							<li>
								Create different agents for different tasks, for
								example:
							</li>
							<ul>
								<li>A GPT &apos;researcher&apos;</li>
								<li>A Claude &apos;content writer&apos;</li>
								<li>
									An in-context-trained LLaMA as a &apos;reviewer&apos;
								</li>
							</ul>
						</ul>
					</li>
					<li>
						Run pre-engineered prompts on multimedia, such as:
						<ul>
							<li>Summarise or transcribe audio.</li>
							<li>Describe what happens in a video.</li>
							<li>Create a diagram of what is written in text.</li>
							<li>Create a picture.</li>
							<li>Do Math with LaTeX.</li>
							<li>Run code and call APIs.</li>
							<li>
								<em>
									Multimedia functionality will grow alongside the
									research and industry.
								</em>
							</li>
						</ul>
					</li>
				</ol>
			</div>
		</div>
	);
}
