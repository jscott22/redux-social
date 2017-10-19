import React from 'react';
import PostList from '../posts/postList';
import ProfileInfo from './profileInfo';

const styles = {
    marginTop: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

export default ({profile, posts}) => {
    return(
        <div style={styles}>
            <ProfileInfo profile={profile}/>
            <div>
                {posts.length > 0
                    ? <PostList posts={posts}/>
                    : <p>This user has no posts to display</p>}
            </div>
        </div>
    );
};