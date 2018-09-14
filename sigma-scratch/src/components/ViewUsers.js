import React, { Component } from 'react';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import { UserService } from '../service/UserService';

export class ViewUsers extends Component {

	constructor() {
		super();
		this.state = {
			users: [],
			loading: true
		};

		this.userService = new UserService();
	}

	componentDidMount() {
		this.userService.getAllUsers().then(data => this.setState({users: data, loading: false}));
	}

	render() {
		return (
			<div className="ui-g">
				<div className="ui-g-12">
					<div className="card card-w-title">
						<h1>View Users</h1>
						<div className="ui-g form-group">
							<DataTable value={this.state.users} paginator={true} 
									rows={10} rowsPerPageOption={[5,10,20]} loading={this.state.loading} >
								<Column field="id" header="ID" filter={true} />
								<Column field="username" header="Username" filter={true} />
								<Column field="status" header="Status" filter={true} />
							</DataTable>
						</div>
					</div>
				</div>
			</div>
		);
	}

}