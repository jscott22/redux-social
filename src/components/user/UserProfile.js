import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import {getUserProfile} from '../../actions/users/index';
import {fetchUsersPosts} from '../../actions/posts/index';
import Profile from './profile';

const styles = {
    control: {
        position: "absolute",
        top: 95,
        right: "30%"
    }
};

class UserProfile extends Component {

    componentWillMount() {
        let userId;
        if(this.props.match.params && this.props.match.params.userId) {
            userId = this.props.match.params.userId
        } else {
            userId = this.props.auth.user._id;
        }
        this.props.getUserProfile(userId);
        this.props.fetchUsersPosts(userId);
    }

    renderContent = () => {
        const {profile, posts, error} = this.props;

        if (!profile || profile.fetchingProfile || posts.fetchingPosts) {
            return <CircularProgress/>;
        }
        if (!error && profile) {
            return <Profile profile={profile} posts={posts}/>;
        }
        return error;
    };

    renderControls = () => {
        if(this.props.auth.user.isAdmin) {
            return(
                <RaisedButton
                    style={styles.control}
                    secondary={true}
                    label={"Manage User"}
                    onClick={this.navigate}
                />
            );
        }
    };

    navigate = () => {
        const {history, users: {profile: {selectedUserId}}} = this.props;
        history.push(`/manage/${selectedUserId}`);
    };

    render() {
        return(
            <div>
                {this.renderControls()}
                {this.renderContent()}
            </div>
        );
    }
}

const displayProfile = ({profile: {users, selectedUserId}}) => users[selectedUserId];

const mapStateToProps = ({users, auth}) => ({
    users,
    auth,
    profile: displayProfile(users),
    posts: users.posts.postIds.map((id) => users.posts.posts[id])
});

export default connect(mapStateToProps, {getUserProfile, fetchUsersPosts})(withRouter(UserProfile));