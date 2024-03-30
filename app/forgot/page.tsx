"use client";

import { useState } from "react";

import FillPageComponent from "@/components/wrappers/FillPage";
import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import Form from "@/components/form/Form";

const forgotPage = () => {
	const [username, setUsername] = useState("");
	const [validationErrors, setValidationErrors] = useState({
		username: true,
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
			<Form url="/auth/forgot" data={{ username }} redirectUrl="/store">
				<h1>Forgot password</h1>
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

export default forgotPage;
