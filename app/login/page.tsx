"use client";

import { useState } from "react";

import CenterFillPageComponent from "@/components/wrappers/CenterFillPage";
import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import Form from "@/components/form/Form";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<CenterFillPageComponent>
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
				/>
				<Input
					name="password"
					label="Password"
					type="password"
					placeholder="Enter your password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button primary={true}>Login</Button>
			</Form>
		</CenterFillPageComponent>
	);
};

export default LoginPage;
