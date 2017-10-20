import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    container: {
        margin: "0 auto",
        height: "70vh",
        width: "70vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    centered: {
        textAlign: "center"
    },
    buttons: {
        marginTop: 20
    },
    margin: {
        marginRight: 15
    }
};

class Landing extends Component {

    renderButtons = (auth) => {
        return !auth.user
            ?
            <div style={styles.buttons}>
                <Link to={'/signup'}>
                    <RaisedButton style={styles.margin} secondary={true} label={"Sign Up"}/>
                </Link>
                <Link to={'/signin'}>
                    <RaisedButton secondary={true} label={"Sign In"}/>
                </Link>
            </div>
            : '';
    };

    render() {
        return (
            <div style={styles.container}>
                <h1 style={styles.centered}>Welcome to Redux Social!</h1>
                <h3 style={styles.centered}>Redux Social is the most functional, cloud based, status quo disrupting
                    social media platform around.</h3>
                {this.renderButtons(this.props.auth)}
            </div>
        );
    }
}

export default connect(({auth}) => ({auth}))(Landing);

