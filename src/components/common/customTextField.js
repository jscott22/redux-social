import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';
import TextField from 'material-ui/TextField';

const renderField =
    ({
         input,
         label,
         type,
         meta: { touched, error}
    }) => {
    return(
        <TextField
            hintText={label ? label : ''}
            floatingLabelText={label ? label : ''}
            errorText={(touched && error) ? error : ''}
            type={type}
            {...input}
        />
    );
};

const customTextField = (props) => {
    return(
        <Field
            name={props.name}
            type={props.type || "text"}
            label={props.label}
            component={renderField}
        />
    );
};

customTextField.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    label: PropTypes.string
};

export default customTextField;