import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {withRouter} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import * as actions from '../../actions';
import CustomField from '../common/customTextField';

import {ROOT_URL} from '../../config/config';

const styles = {
    container: {
        marginTop: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons: {
        display: 'flex',
        marginTop: 40
    },
    centered: {
        textAlign: 'center'
    }
};

class SignIn extends Component {

    handleFormSubmit = ({email, password}) => {
        this.props.signIn({email, password}, this.props.history);
    };

    renderError = () => {
        const error = this.props.errorMessage;
        if (error) {
            return (
                <div style={styles.centered}>
                    {error}
                </div>
            );
        }
    };

    render() {

        const {handleSubmit} = this.props;

        return (
            <div style={styles.container}>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <div style={styles.centered}>
                        <CustomField
                            name="email"
                            type="email"
                            label="Email"
                        />
                    </div>
                    <div style={styles.centered}>
                        <CustomField
                            name="password"
                            type="password"
                            label="Password"
                        />
                    </div>
                    {this.renderError()}
                    <div style={styles.buttons}>
                        <RaisedButton
                            buttonStyle={{
                                backgroundColor: 'red',
                                color: 'white'
                            }}
                            href={`${ROOT_URL}/auth/google`}
                            label='Sign in with Google'
                            labelStyle={{color: 'white'}}
                            icon={<FontIcon className='fa fa-google'/>}
                        />
                        <RaisedButton
                            style={{marginLeft: 10}}
                            type={'submit'}
                            primary={true}
                            label={'Sign In'}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

const validate = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Email is required';
    }

    if (!values.password) {
        errors.password = 'Password is required';
    }

    return errors;
};

const signIn = reduxForm({
    form: 'signIn',
    validate
})(SignIn);

const mapStateToProps = (state) => {
    return {errorMessage: state.auth.error};
};

export default connect(mapStateToProps, actions)(withRouter(signIn));
