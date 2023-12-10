import CenterFillPageComponent from "@/components/wrappers/CenterFillPage";
import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import Form from "@/components/form/Form";

const LoginPage = () => {
	return (
		<CenterFillPageComponent>
			<Form>
				<h1>Login</h1>
				<Input
					name="email"
					label="Email"
					type="email"
					placeholder="Enter your email"
				/>
				<Input
					name="password"
					label="Password"
					type="password"
					placeholder="Enter your password"
				/>
				<Button primary={true}>Login</Button>
			</Form>
		</CenterFillPageComponent>
	);
};

export default LoginPage;
