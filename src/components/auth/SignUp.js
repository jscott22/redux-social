import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {withRouter} from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

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
    right: {
        textAlign: 'right'
    },
    buttons: {
        display: 'flex',
        marginTop: 40
    },
    centered: {
        textAlign: 'center'
    }
};

class SignUp extends Component {

    handleFormSubmit = (values) => {
        this.props.signUp({
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName
        }, this.props.history);
    };

    renderError = () => {
        return (
            <div>
                {this.props.errorMessage}
            </div>
        );
    };

    render() {

        const {handleSubmit} = this.props;

        return (
            <div style={styles.container}>
                <form style={styles.centered}
                    onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <div>
                        <CustomField
                            name="email"
                            type="email"
                            label="Email"
                            icon="email"
                        />
                    </div>
                    <div>
                        <CustomField
                            name="password"
                            type="password"
                            label="Password"
                            icon="lock"
                        />
                    </div>
                    <div>
                        <CustomField
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            icon="lock"
                        />
                    </div>
                    <div>
                        <CustomField
                            name="firstName"
                            type="text"
                            label="First Name"
                            icon="lock"
                        />
                    </div>
                    <div>
                        <CustomField
                            name="lastName"
                            type="text"
                            label="Last Name"
                            icon="lock"
                        />
                    </div>
                    <div>
                        {this.renderError()}
                    </div>
                    <div style={styles.buttons}>
                        <RaisedButton
                            buttonStyle={{
                                backgroundColor: 'red',
                                color: 'white'
                            }}
                            href={`${ROOT_URL}/auth/google`}
                            label='Sign Up with Google'
                            labelStyle={{color: 'white'}}
                            icon={<FontIcon className='fa fa-google'/>}
                        />
                        <RaisedButton
                            type={'submit'}
                            primary={true}
                            label={'Sign Up'}
                            style={{marginLeft: 10}}
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

    if (!values.firstName) {
        errors.firstName = 'First name is required';
    }

    if (!values.lastName) {
        errors.lastName = 'Last name is required';
    }

    if (values.password && !values.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
    }

    if ((values.password && values.confirmPassword)
        && (values.password !== values.confirmPassword)) {
        errors.password = 'Passwords do not match';
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
};

const signUp = reduxForm({
    form: 'signUp',
    validate
})(SignUp);

const mapStateToProps = (state) => {
    return {errorMessage: state.auth.error};
};

export default connect(mapStateToProps, actions)(withRouter(signUp));
