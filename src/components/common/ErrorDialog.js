import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import * as _ from 'lodash';

class ErrorDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            message: ""
        }
    }

    componentWillUpdate(nextProps) {
        if (this.props === nextProps) return;

        _.forIn(nextProps, (value) => {
            if (value && value !== null && typeof value === 'string') {
                this.handleOpen(value);
            }
        });
    }

    handleOpen = (message) => {
        this.setState({open: true, message});
    };

    handleClose = () => {
        return this.setState({open: false, message: ""});
    };

    render () {

        return (
            <div>
                <Dialog
                    actions={
                        <FlatButton
                            label="Close"
                            secondary={true}
                            onClick={this.handleClose}
                        />}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    title={"Error"}
                >
                    {this.state.message}
                </Dialog>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    createError: state.posts.create.error,
    deleteError: state.posts.delete.error
});

export default connect(mapStateToProps)(ErrorDialog);