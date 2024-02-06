"use client";

import { useState } from "react";

import FillPageComponent from "@/components/wrappers/FillPage";
import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import Form from "@/components/form/Form";

const RegisterPage = ({ params }: { params: any }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [validationErrors, setValidationErrors] = useState({
		name: true,
		password: true,
		passwordConfirm: true,
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
				url={`/auth/register/${params.uid}`}
				data={{ username, password }}
				redirectUrl={"/store"}
			>
				<h1>Register</h1>
				<Input
					name="name"
					label="Name"
					type="text"
					placeholder="Enter your name"
					onChange={(e) => setUsername(e.target.value)}
					validations={[
						{ type: "required", errorMessage: "Please enter your name." },
					]}
					onValidationError={() => handleValidationError("name")}
					onValidationSuccess={() => handleValidationSuccess("name")}
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
						{
							type: "minLength",
							value: 8,
							errorMessage:
								"Password must be at least 8 characters long.",
						},
					]}
					onValidationError={() => handleValidationError("password")}
					onValidationSuccess={() => handleValidationSuccess("password")}
				/>
				<Input
					name="passwordConfirm"
					label="Confirm Password"
					type="password"
					placeholder="Enter your password again"
					validations={[
						{
							type: "required",
							errorMessage: "Please confirm your password.",
						},
						{
							type: "minLength",
							value: 8,
							errorMessage: "Password must be at least 8 characters.",
						},
						{
							type: "match",
							value: password,
							errorMessage: "Passwords must match.",
						},
					]}
					onValidationError={() =>
						handleValidationError("passwordConfirm")
					}
					onValidationSuccess={() =>
						handleValidationSuccess("passwordConfirm")
					}
				/>
				<Button
					primary={true}
					disabled={Object.values(validationErrors).some((error) => error)}
				>
					Register
				</Button>
			</Form>
		</FillPageComponent>
	);
};

export default RegisterPage;
