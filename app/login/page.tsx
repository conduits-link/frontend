"use client";

import { useState } from "react";

import FillPageComponent from "@/components/wrappers/FillPage";
import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import Form from "@/components/form/Form";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [validationErrors, setValidationErrors] = useState({
		username: true,
		password: true,
	});

	const handleValidationError = (name: string) => {
		setValidationErrors((prevErrors) => ({
			...prevErrors,
			[name]: true,
		}));
	};

	const handleValidationSuccess = (name: string) => {
		setValidationErrors((prevErrors) => ({
			...prevErrors,
			[name]: false,
		}));
	};

	return (
		<FillPageComponent>
			<Form
				url="/auth/login"
				data={{ username, password }}
				redirectUrl="/store"
			>
				<h1>Login</h1>
				<Input
					name="username"
					label="Username"
					type="text"
					placeholder="Enter your username"
					onChange={(e) => setUsername(e.target.value)}
					validations={[
						{
							type: "required",
							errorMessage: "Please enter your username address.",
						},
					]}
					onValidationError={() => handleValidationError("username")}
					onValidationSuccess={() => handleValidationSuccess("username")}
				/>
				<Input
					name="password"
					label="Password"
					type="password"
					placeholder="Enter your password"
					onChange={(e) => setPassword(e.target.value)}
					validations={[
						{
							type: "required",
							errorMessage: "Please enter your password.",
						},
					]}
					onValidationError={() => handleValidationError("password")}
					onValidationSuccess={() => handleValidationSuccess("password")}
				/>
				<Button
					primary={true}
					disabled={Object.values(validationErrors).some((error) => error)}
				>
					Login
				</Button>
			</Form>
		</FillPageComponent>
	);
};

export default LoginPage;
