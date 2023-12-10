import CenterFillPageComponent from "@/components/wrappers/CenterFillPage";
import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import Form from "@/components/form/Form";

const RegisterPage = () => {
	return (
		<CenterFillPageComponent>
			<Form>
				<h1>Register</h1>
				<Input
					name="name"
					label="Name"
					type="text"
					placeholder="Enter your name"
				/>
				<Input
					name="password"
					label="Password"
					type="password"
					placeholder="Enter your password"
				/>
				<Input
					name="passwordConfirm"
					label="Confirm Password"
					type="password"
					placeholder="Enter your password again"
				/>
				<Button primary={true}>Register</Button>
			</Form>
		</CenterFillPageComponent>
	);
};

export default RegisterPage;
