import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form';
import TextField from 'material-ui/TextField';

const renderField =
    ({
         input,
         label,
        rows,
        maxRows,
         meta: { touched, error}
     }) => {
        return(
            <TextField
                floatingLabelText={label ? label : ''}
                errorText={(touched && error) ? error : ''}
                type={"text"}
                multiLine={true}
                rows={rows}
                maxRows={maxRows}
                {...input}
            />
        );
    };

const customTextArea = (props) => {
    return(
        <Field
            name={props.name}
            label={props.label}
            rows={props.rows}
            maxRows={props.maxRows}
            multiLine={true}
            component={renderField}
        />
    );
};

customTextArea.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    rows: PropTypes.number,
    maxRows: PropTypes.number
};

export default customTextArea;