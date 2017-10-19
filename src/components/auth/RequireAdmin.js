import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

export default function(ComposedComponent) {
    class Admin extends Component {

        componentWillMount() {
            if (!this.props.admin) {
                this.props.history.push('/feed');
            }
        }

        componentWillUpdate(nextProps) {
            if (!this.nextProps.admin) {
                this.props.history.push('/feed');
            }
        }

        render() {
            return(
                this.props.admin=== true
                    ? <ComposedComponent {...this.props}/>
                    : ''
            );
        }
    }

    const mapStateToProps = state => {
        return {
            admin: state.auth.user.isAdmin || false
        }
    };

    return connect(mapStateToProps)(withRouter(Admin));
}