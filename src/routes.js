import { BrowserRouter as Router, Route, Redirect, Switch, NavLink } from 'react-router-dom';
import { Component } from 'react';
import  LoginPage  from './login'
import RegisterPage  from './register'
import HomePage from './home'
import Form from './form'
import Records from './records'
import RecordsList from './recordsList'
import GuardedRoute from './routeGuard';

class Routes extends Component {

    constructor(props) {
        super(props)
        // this.isAuthenticated = 
    }
    state = {
        isAuthenticated: localStorage.getItem('isAuthenticated')
    }

    render() {
        const { isAuthenticated } = this.state
        console.log('is authenticated:::', isAuthenticated)
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/"  render={(props) => (<LoginPage {...props} />) } />
                        <Route path="/register"   render={(props) => (<RegisterPage {...props} />) } />
                        {/* <Route path="/home" component={HomePage} /> */}
                        <GuardedRoute path='/home' component={HomePage} auth={isAuthenticated} />
                        {/* <Route path="/records" component = {RecordsList} /> */}
                        <Route path="*" component={() => <h2 style={{ textAlign: "center" }}>404 NOT FOUND</h2>} />
                    </Switch>
                </Router>
            </div>
        )
    }

}

export default Routes;