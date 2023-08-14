import PromptButton from "./_PromptButton";

export default function SummarisePromptButton() {
	return (
		<div>
			<PromptButton
                prompt="Please rewrite the following text in the fewest possible sentences, whilst ensuring that no key information is lost. If making it any shorter causes information to be lost, then please do not do anything."
			>
				Summarise
			</PromptButton>
		</div>
	);
}