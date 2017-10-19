import React, {Component} from 'react';
import {Router} from 'react-router-dom';
import {connect} from 'react-redux';

import NavBar from './components/nav/NavBar';
import ErrorDialog from './components/common/ErrorDialog';
import Routes from './routes';
import * as actions from './actions';
import history from './history';

import "./App.css";

const styles = {
    marginTop: 64
};

class App extends Component {

    componentWillMount() {
        this.props.checkAuth(history);
    }

    render() {
        return (
            <Router history={history}>
                <div style={styles}>
                    <NavBar/>
                    <main>
                        <Routes/>
                    </main>
                    <ErrorDialog/>
                </div>
            </Router>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated
    }
};

export default connect(mapStateToProps, actions)(App);
