import React, { Component } from 'react';
import { InputText } from 'primereact/components/inputtext/InputText';
import { Password } from 'primereact/components/password/Password';
import { Button } from 'primereact/components/button/Button';
import { Growl } from 'primereact/components/growl/Growl';
import { ProgressSpinner } from 'primereact/components/progressspinner/ProgressSpinner';
import { UserService } from '../../service/UserService';

export class CreateUser extends Component {

	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			passwordNotMatched: false,
			isButtonEnabled: false,
			showSpinner: false
		};

		this.showMessage = this.showMessage.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.userService = new UserService();
	}

	showMessage(_severity, _summary, _detail) {
		this.growl.show({ severity: _severity, summary: _summary, detail: _detail });
	}

	onSubmit() {
		this.setState({showSpinner: true, isButtonEnabled: false});
		this.userService.createUser(this.state.username, this.state.password, 'dummy@email.com')
			.then(res => {
				if (res.data.code === 0) {
					this.showMessage('success', 'Success', 'Web User has been successfully created!');
					this.setState({username: '', password: '', confirmPassword: '', showSpinner: false});
				} else {
					this.setState({showSpinner: false, isButtonEnabled: true});
					this.showMessage('error', 'Error', res.data.message);
				}
			});
	}

	onChange(event) {
		this.setState({confirmPassword: event.target.value});
		if (this.state.password !== event.target.value)
			this.setState({passwordNotMatched: true, isButtonEnabled: false});
		else
			this.setState({passwordNotMatched: false, isButtonEnabled: true});
	}

	render() {
		return (
				<div className="ui-g">
					<div className="ui-g-12">
						<div className="card card-w-title">
							<Growl ref={(el) => this.growl = el} />
							<h1>Create User</h1>

							<div className="ui-g form-group">
								<div className="ui-g-12 ui-md-2">
	                                <label htmlFor="username">Username</label>
	                            </div>
		                        <div className="ui-g-12 ui-md-4">
		                            <InputText id="username" placeholder="Username" 
		                            	value={this.state.username} 
		                            	onChange={(e) => this.setState({username: e.target.value})}/>
		                        </div>
		                    </div>

		                    <div className="ui-g form-group">
		                    	<div className="ui-g-12 ui-md-2">
	                                <label htmlFor="password">Password</label>
	                            </div>
		                        <div className="ui-g-12 ui-md-4">
		                            <Password id="password" placeholder="Password" value={this.state.password} 
		                            	onChange={(e) => this.setState({password: e.target.value})}/>
		                        </div>
		                    </div>

		                    <div className="ui-g form-group">
		                    	<div className="ui-g-12 ui-md-2">
	                                <label htmlFor="cpassword">Confirm Password</label>
	                            </div>
		                        <div className="ui-g-12 ui-md-4">
		                            <Password id="cpassword" 
		                            	value={this.state.confirmPassword}
		                            	placeholder="Confirm password" 
		                            	className={this.state.passwordNotMatched ? 'ui-state-error' : null}
		                            	onChange={this.onChange	}/>
		                            {this.state.passwordNotMatched ? <ConfirmPasswordError /> : null}
		                        </div>
		                    </div>

		                    <div className="ui-g form-group">
		                    	<div className="ui-g-12 ui-md-4">
		                    		<Button disabled={!this.state.isButtonEnabled} label="Save" icon="fa-save" style={{marginBottom:'10px'}} 
		                    			onClick={this.onSubmit}/>
									{this.state.showSpinner ? <ProgressSpinner style={{width: '17px', height: '17px'}} strokeWidth="5" fill="#EEEEEE" animationDuration=".5s"/> : null}
		                    	</div>
		                    </div>

						</div>
					</div>
				</div>
		);
	}

}

function ConfirmPasswordError() {
	return (
		<div className="ui-message ui-messages-error ui-corner-all">
        	Not Matched!
        </div>
	);
}