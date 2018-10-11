import axios from 'axios';

export class UserService {

	createUser(_username, _password, _email) {
		return axios.post('http://localhost:8080/prime-sigma/web/user', {
			username: _username,
			password: _password,
			email: _email
		})
		.then(res => {return res;})
		.catch(err => err);
	}

	getAllUsers() {
		return axios.get('http://localhost:8080/prime-sigma/web/users')
		.then(res => res.data.data)
		.catch(err => []);
	}

}