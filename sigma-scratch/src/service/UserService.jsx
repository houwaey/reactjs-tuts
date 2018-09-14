import axios from 'axios';

export class UserService {

	createUser(_username, _password) {
		axios.post('http://localhost/web/pm/admin/service/user-service.php', {
			operation: 'create-user',
			username: _username,
			password: _password
		})
		.then(function(response) {
			console.log(response);
		})
		.catch(function(error) {
			console.log(error);
		});
	}

	getAllUsers() {
		return axios.get('http://localhost/web/pm/admin/service/user-service.php', {
			params: {
				operation: 'search-all-users'
			}
		})
		.then(res => res.data.data)
		.catch(err => []);
	}

}