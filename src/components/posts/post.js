import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Face from 'material-ui/svg-icons/action/face';
import Avatar from 'material-ui/Avatar';
import {Card, CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card';
import PostActions from './postActionBar';
import PostMenu from './postMenu';

import moment from 'moment';

import {deletePost} from '../../actions/posts/index';

import Chips from './chips/chips';

const styles = {
    card: {
        width: 350,
        margin: '25px 10px'
    },
    header: {
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        height: 32,
        width: 32
    },
    menu: {
        position: 'absolute',
        right: 10,
        top: 10
    }
};

class Post extends Component {

    renderAvatar = () => {
        const {post: {author: {avatar}}} = this.props;
        return (
            this.props.post.author.avatar
                ? <Avatar src={avatar} style={styles.avatar}/>
                : <Avatar icon={<Face/>} style={styles.avatar}/>
        );
    };

    renderMenu = () => {
        const {auth: {user: {_id, isAdmin}}, post: {author}} = this.props;

        return isAdmin || author._id === _id
            ? <PostMenu style={styles.menu} onRemove={this.handleRemove}/>
            : ''
    };

    handleRemove = async () => {
        const {post: {_id}} = this.props;
        await this.props.deletePost(_id);
    };

    render() {

        const {post: {author, picture, postedOn, title, tags, content}} = this.props;

        return (
            <Card style={styles.card}>
                <CardHeader
                    title={
                        <Link
                            to={`/profile/${author._id}`}
                        >
                            {`${author.firstName} ${author.lastName}`}
                        </Link>
                    }
                    subtitle={moment(postedOn).fromNow()}
                    avatar={this.renderAvatar()}
                    style={styles.header}
                >
                    {this.renderMenu()}
                </CardHeader>
                <CardTitle title={title}/>
                <Chips chips={tags}/>
                {picture
                    ? <CardMedia>
                        <img alt="Card Media" src={picture}/>
                    </CardMedia>
                    : ''
                }
                <CardText>
                    {content}
                </CardText>
                <PostActions post={this.props.post}/>
            </Card>
        );
    }
}

Post.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string,
        author: PropTypes.shape({
            _id: PropTypes.string,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            avatar: PropTypes.string
        }),
        picture: PropTypes.string,
        title: PropTypes.string.isRequired,
        postedOn: PropTypes.string.isRequired,
        content: PropTypes.string,
        tags: PropTypes.array
    }).isRequired,
    deletePost: PropTypes.func
};

const mapStateToProps = ({auth}) => ({auth});

export default connect(mapStateToProps, {deletePost})(Post);