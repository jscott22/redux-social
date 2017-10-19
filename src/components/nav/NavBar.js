import React, {Component} from 'react';
import {withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import NavLinks from './navLinks';
import * as actions from '../../actions/index';

const styles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: "100%"
};

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    toggleOpen = () => {
        this.setState({open: !this.state.open});
    };

    signOut = () => {
        this.props.signOut(this.props.history);
        this.toggleOpen();
    };

    render() {
        return (
            <div>
                <AppBar
                    style={styles}
                    onLeftIconButtonTouchTap={this.toggleOpen}
                    title={'Redux Social'}
                />
                <Drawer
                    open={this.state.open}
                    docked={false}
                    onRequestChange={this.toggleOpen}
                >
                    <NavLinks
                        signOut={this.signOut}
                        toggleOpen={this.toggleOpen}
                        authenticated={this.props.authenticated}
                    />
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated
    };
};

export default connect(mapStateToProps, actions)(withRouter(NavBar));