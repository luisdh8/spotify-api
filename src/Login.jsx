import { useState } from "react";
import { TextField, Box, Button } from "@mui/material";

export default function Login() {
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	return (
		<>
			<Box display="flex" flexDirection="column" gap={2} width={300}>
				<TextField
					label="First Name"
					variant="outlined"
					name="firstName"
					value={form.firstName}
					onChange={handleChange}
					placeholder="Enter your first name"
				/>
				<TextField
					label="Last Name"
					variant="outlined"
					name="lastName"
					value={form.lastName}
					onChange={handleChange}
					placeholder="Enter your last name"
				/>
				<TextField
					label="Email"
					variant="outlined"
					type="email"
					name="email"
					value={form.email}
					onChange={handleChange}
					placeholder="Enter your email"
				/>
				<TextField
					label="Password"
					variant="outlined"
					type="password"
					name="password"
					value={form.password}
					onChange={handleChange}
					placeholder="Enter your password"
				/>
			</Box>
			<Button variant="contained" color="primary">
				Log In
			</Button>
		</>
	);
}
