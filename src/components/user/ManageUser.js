import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import {getUserProfile, promoteUser, removeUser} from '../../actions/users/index';
import ProfileInfo from './profileInfo';
import RaisedButton from 'material-ui/RaisedButton';
import {red900} from 'material-ui/styles/colors';

const styles = {
    container: {
        marginTop: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 20
    },
    removeButton: {
        backgroundColor: red900,
        color: "white",
    },
    promoteButton: {
        marginLeft: 30
    },
    centered: {
        textAlign: "center"
    }
};

class ManageUser extends Component {

    componentWillMount() {
        let userId;
        if(this.props.match.params && this.props.match.params.userId) {
            userId = this.props.match.params.userId
        } else {
            userId = this.props.auth.user._id;
        }
        this.props.getUserProfile(userId);
    }

    renderContent = () => {

        const {profile, error} = this.props;

        if (error) {
            return(
                <div>
                    <h3 style={styles.centered}>Something went wrong!</h3>
                    <h4 style={styles.centered}>Perhaps that user does not exist.</h4>
                </div>
            );
        }

        if (!profile || profile.fetchingProfile) {
            return <CircularProgress/>;
        }

        if (profile) {
            return (
                <div>
                    <ProfileInfo profile={profile}/>
                </div>
            );
        }

        if(!profile) {
            return (
                <h4>
                    No matching user
                </h4>
            );
        }

        return '';
    };

    renderControls = () => {
        const {profile} = this.props;

        if(profile && !profile.isAdmin) {
            return (
            <div style={styles.buttonContainer}>
                <RaisedButton
                    onClick={this.removeUser}
                    buttonStyle={styles.removeButton}
                    labelStyle={styles.removeButton}
                    label={"Delete User"}
                />
                <RaisedButton
                    onClick={this.promoteUser}
                    label={"Promote User"}
                    style={styles.promoteButton}
                />
            </div>
            );
        }

        return '';
    };

    removeUser = () => {
        this.props.removeUser(this.props.userId, this.props.history);
    };

    promoteUser = () => {
        this.props.promoteUser(this.props.userId);
    };

    render() {
        return(
            <div style={styles.container}>
                {this.renderContent()}
                {this.renderControls()}
            </div>
        );
    }
}

const displayProfile = ({profile: {users, selectedUserId}}) => users[selectedUserId];

const mapStateToProps = ({users, auth}) => ({
    auth,
    error: users.error,
    userId: users.profile.selectedUserId,
    profile: displayProfile(users)
});

export default connect(mapStateToProps, {getUserProfile, promoteUser, removeUser})(withRouter(ManageUser));