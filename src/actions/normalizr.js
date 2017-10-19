import {schema} from 'normalizr';

export const user = new schema.Entity('users', {}, {idAttribute: '_id'});
export const post = new schema.Entity('posts', {}, {idAttribute: '_id'});
export const postsList = { posts: [post]};