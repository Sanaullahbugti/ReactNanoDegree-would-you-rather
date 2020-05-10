import React, { Component } from 'react';
import './App.css';
import './menu.css';
import 'antd/dist/antd.css';
import { Route, Redirect, Switch } from 'react-router-dom'
import Login from './component/Login'
import Home from "./component/Home";
import Question from './component/Question';
import AddQuestionForm from './component/AddQuestion';
import { connect } from "react-redux";
import LeaderBoard from './component/LeaderBoard';
import NavBar from './component/NavBar';
import { useLocation } from 'react-router-dom'
import ErrorPage from './component/ErrorPage';

class App extends Component {

	render() {

		return (
			<React.Fragment>
				{this.props.currentUser !== null ? <NavBar /> : null}
				<Switch>
					<Route exact path="/" component={Login} />
					<PrivateRoute exact path="/home" component={Home}
						currentUser={this.props.currentUser}
					/>
					<PrivateRoute exact path="/add-question" component={AddQuestionForm}
						currentUser={this.props.currentUser} />
					<PrivateRoute exact path="/question/:questionId" component={Question}
						currentUser={this.props.currentUser}
					/>
					<PrivateRoute exact path="/leaders-board" component={LeaderBoard}
						currentUser={this.props.currentUser} />
					<Route path='*' exact={true} component={ErrorPage} />
				</Switch>
			</React.Fragment> )
	}
}
const PrivateRoute = ( { component: Component, currentUser, ...rest } ) => {
	
	let location = useLocation();

	return (
		<Route
			{...rest}
			render={props =>
				authenticate( currentUser ) ? <Component {...props} /> : <Redirect to={{
					pathname: "/",
					state: { referrer: location.pathname }
				}} />
			}
		/>
	);
};

const authenticate = ( currentUser ) => {
	if ( currentUser !== null ) {
		return true;
	}
	return false;
};
const mapStateToProps = ( state ) => {
	return {
		currentUser: state.userReducer.currentUser
	}
}
export default connect( mapStateToProps, null )( App )
