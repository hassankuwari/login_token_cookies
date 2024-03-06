import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useCookies } from 'react-cookie';


function CustomLogInForm() {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [loginToken, setLoginToken] = useState('')

	const [cookies, setCookie] = useCookies(['Token']);


	const handleEmailChange = (inputEmail) => {
		console.log("email changed", inputEmail);
		setEmail(inputEmail);
	}

	const handlePasswordChange = (inputPass) => {
		console.log("password changed", inputPass);
		setPassword(inputPass);
	}

	const handleSubmit = () => {
		console.log("submitted");
		const saveData = {
			username: email,
			password: password
		}
		axios.post(`https://dummyjson.com/auth/login`, saveData).then((response) => {
			console.log("response of post api", response.data);
			setLoginToken(response.data.token);
			setCookie('Token', response.data.token, { path: '/', maxAge: 500 });
			setEmail('');
			setPassword('');
		})
	}

	console.log("token", loginToken);



	const handleGet = () => {
		console.log("get");
		const token = cookies.Token;
		console.log("mila kya",token);
		const config = {
			headers: { Authorization: `Bearer ${token}` }
		};

		axios.get(`https://dummyjson.com/auth/me`, config).then((response) => {
			console.log("response of get api", response)
		})
	}


	return (
		<div className="main-container">

			<Form className='form'>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => handleEmailChange(e.target.value)}
						required
					/>
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="text"
						placeholder="Password"
						value={password}
						onChange={(e) => handlePasswordChange(e.target.value)}
						required
					/>
				</Form.Group>
				{/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
				<Button variant="primary" onClick={() => handleSubmit()}>
					Submit
				</Button>
				<Button variant="secondary" onClick={() => handleGet()}>
					Get
				</Button>
			</Form>
		</div>

	);
}

export default CustomLogInForm;