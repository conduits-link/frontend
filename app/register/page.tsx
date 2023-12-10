import CenterFillPageComponent from "@/components/wrappers/CenterFillPage";
import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import Form from "@/components/form/Form";

const PreRegisterPage = () => {
	return (
		<CenterFillPageComponent>
			<Form>
				<h1>Register</h1>
				<Input
					name="email"
					label="Email"
					type="email"
					placeholder="Enter your email"
				/>
				<Button primary={true}>Register</Button>
			</Form>
		</CenterFillPageComponent>
	);
};

export default PreRegisterPage;
