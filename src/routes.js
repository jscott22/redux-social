import React from 'react';

import {Route, Switch} from 'react-router-dom';

import RequireAuth from './components/auth/RequireAuth';
import RequireAdmin from './components/auth/RequireAdmin';
import RedirectAuthed from './components/auth/RedirectAuthed';

import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Landing from './components/landing/landing';
import Feed from './components/feed/Feed';
import UserProfile from './components/user/UserProfile';
import ManageUser from './components/user/ManageUser';
import CreatePost from './components/create/CreatePost';

export default function routes() {
        return(
            <Switch>
                <Route exact path="/" component={Landing}/>
                <Route path="/signin" component={RedirectAuthed(SignIn)}/>
                <Route path="/signup" component={RedirectAuthed(SignUp)}/>
                <Route path="/create" component={RequireAuth(CreatePost)}/>
                <Route path="/feed" component={RequireAuth(Feed)}/>
                <Route path="/profile/:userId?/" component={RequireAuth(UserProfile)}/>
                <Route path="/manage/:userId?/" component={RequireAuth(RequireAdmin(ManageUser))}/>
            </Switch>
        );
}