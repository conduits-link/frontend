"use client";

import { useState } from "react";

import FillPageComponent from "@/components/wrappers/FillPage";
import Button from "@/components/buttons/Button";
import Input from "@/components/form/Input";
import Form from "@/components/form/Form";

import styles from "./page.module.css";

const PreRegisterPage = () => {
	const [submitted, setSubmitted] = useState(false);
	const [email, setEmail] = useState("");

	return (
		<FillPageComponent>
			{!submitted && (
				<Form
					url="/auth/register"
					data={{ email }}
					onRes={(res: apiResponse) =>
						res.status == 200 && setSubmitted(true)
					}
				>
					<h1>Register</h1>
					<Input
						name="email"
						label="Email"
						type="email"
						placeholder="Enter your email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Button primary={true}>Register</Button>
				</Form>
			)}
			{submitted && (
				<div className={styles.containerSubmitted}>
					<h1>Almost there...</h1>
					<p>Please check your email to finish creating your account.</p>
				</div>
			)}
		</FillPageComponent>
	);
};

export default PreRegisterPage;
