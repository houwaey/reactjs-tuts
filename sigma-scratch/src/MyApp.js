import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import './App.css';

const Home = () => (
  <HomePage />
);

const Login = () => (
  <LoginPage />
);

class MyApp extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Route exact path="/login" component={Login} />
					<Route path="/" component={Home} />
				</div>
			</Router>
		);
	}
}

export default MyApp;