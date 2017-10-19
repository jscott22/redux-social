import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

export default function(ComposedComponent) {
    class Authentication extends Component {

        componentWillMount() {
            if (!this.props.fetching && this.props.authenticated === false) {
                this.props.history.push('/signin');
            }
        }

        componentWillUpdate(nextProps) {
            if (!this.props.fetching && this.nextProps.authenticated === false) {
                this.props.history.push('/signin');
            }
        }

        render() {
            return(
                this.props.authenticated === true && !this.props.fetching
                ? <ComposedComponent {...this.props}/>
                : ''
            );
        }
    }

    const mapStateToProps = state => {
        return {
        authenticated: state.auth.authenticated,
        fetching: state.auth.fetching
        }
    };

    return connect(mapStateToProps)(withRouter(Authentication));
}