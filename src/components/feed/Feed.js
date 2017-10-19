import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchPosts} from '../../actions/index';
import PostList from '../posts/postList';
import CreateButton from '../controls/createButton';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
};

class Feed extends Component {

    componentWillMount() {
        this.props.fetchPosts();
    }

    render() {
        return(
            <div style={styles.container}>
                {this.props.fetching
                    ? <h1>Loading</h1>
                    : <PostList posts={this.props.posts}/>
                }
                <CreateButton/>
            </div>
        );
    }
}

function mapStateToProps({posts: {posts: {fetching, byId, postIds}}}) {
    return {
        fetching,
        posts: postIds.map((id) => byId[id])
    }
}

export default connect(mapStateToProps, {fetchPosts})(Feed);