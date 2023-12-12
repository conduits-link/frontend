"use client";

import { useState } from "react";

import FillPageComponent from "@/components/wrappers/FillPage";
import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import Form from "@/components/form/Form";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [validationErrors, setValidationErrors] = useState({
		email: true,
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
				data={{ email, password }}
				redirectUrl="/store"
			>
				<h1>Login</h1>
				<Input
					name="email"
					label="Email"
					type="email"
					placeholder="Enter your email"
					onChange={(e) => setEmail(e.target.value)}
					validations={[
						{
							type: "required",
							errorMessage: "Please enter your email address.",
						},
					]}
					onValidationError={() => handleValidationError("email")}
					onValidationSuccess={() => handleValidationSuccess("email")}
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
