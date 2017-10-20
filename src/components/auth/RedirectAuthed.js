import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

export default function(ComposedComponent) {
    class RedirectAuthed extends Component {

        componentWillMount() {
            if (this.props.authed) {
                this.props.history.push('/feed');
            }
        }

        componentWillUpdate(nextProps) {
            if (this.nextProps.authed) {
                this.props.history.push('/feed');
            }
        }

        render() {
            return(
                !this.props.authed
                    ? <ComposedComponent {...this.props}/>
                    : ''
            );
        }
    }

    const mapStateToProps = state => {
        return {
            authed: state.auth.user
        }
    };

    return connect(mapStateToProps)(withRouter(RedirectAuthed));
}