import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import Favorite from 'material-ui/svg-icons/action/favorite';
import Comment from 'material-ui/svg-icons/communication/comment';
import {CardActions} from 'material-ui/Card';

import * as actions from '../../actions';

const styles = {
    actions: {
        display: 'flex',
        justifyContent: 'space-between'
    }
};

class PostActionBar extends Component {

    handleLike = () => {
        console.log(this.props.post.likes);
        const liked = this.props.post.likes.find((like) => like._id === this.props.user._id);
        console.log(liked);
        if (liked) {
            this.props.likePost(true, this.props.post._id);
        } else {
            this.props.likePost(false, this.props.post._id);
        }
    };

    likeStyle = () => {
        const liked = this.props.post.likes.find((like) => like._id === this.props.user._id);
        if (liked) {
            return 'red'
        }
        return null;
    };

    render() {
        return (
            <CardActions style={styles.actions}>
                <RaisedButton
                    onClick={this.handleLike}
                    icon={<Favorite color={this.likeStyle()}/>}
                    label={`(${this.props.post.likes.length}) Like`}
                />
                <RaisedButton
                    icon={<Comment/>}
                    label={`(${this.props.post.comments.length}) Comment`}
                />
            </CardActions>
        );
    }
}

PostActionBar.propTypes = {
    post: PropTypes.object,
    user: PropTypes.object,
    likePost: PropTypes.func
};

const mapStateToProps = ({auth: {user}}) => {
    return {
        user
    }
};

export default connect(mapStateToProps, actions)(PostActionBar);