import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import Post from './Post';

const postList = ({posts}) => {
    return posts.map((post) => <Post key={uuid.v4()} post={post}/>)
};

postList.propTypes = {
  posts: PropTypes.array.isRequired
};

export default postList;