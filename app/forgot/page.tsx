"use client";

import { useState } from "react";

import FillPageComponent from "@/components/wrappers/FillPage";
import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import Form from "@/components/form/Form";

const ForgotPage = () => {
	const [email, setEmail] = useState("");
	const [validationErrors, setValidationErrors] = useState({
		email: true,
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
			<Form url="/auth/forgot" data={{ email }}>
				<h1>Forgot Password</h1>
				<Input
					name="email"
					label="Email"
					type="text"
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
				<Button
					primary={true}
					disabled={Object.values(validationErrors).some((error) => error)}
				>
					Request password reset
				</Button>
			</Form>
		</FillPageComponent>
	);
};

export default ForgotPage;
