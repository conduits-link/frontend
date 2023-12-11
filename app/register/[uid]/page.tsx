"use client";

import { useState } from "react";

import CenterFillPageComponent from "@/components/wrappers/CenterFillPage";
import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import Form from "@/components/form/Form";

const RegisterPage = ({ params }: { params: any }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<CenterFillPageComponent>
			<Form
				url={`/auth/register/${params.uid}`}
				data={{ email, password }}
				redirectUrl={"/store"}
			>
				<h1>Register</h1>
				<Input
					name="name"
					label="Name"
					type="text"
					placeholder="Enter your name"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					name="password"
					label="Password"
					type="password"
					placeholder="Enter your password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Input
					name="passwordConfirm"
					label="Confirm Password"
					type="password"
					placeholder="Enter your password again"
				/>
				<Button
					primary={true}
					// disabled={!valid}
				>
					Register
				</Button>
			</Form>
		</CenterFillPageComponent>
	);
};

export default RegisterPage;
