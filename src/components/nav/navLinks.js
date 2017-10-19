import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router-dom';

const navLinks = ({authenticated, signOut, toggleOpen}) => {
    if (authenticated) {
        return (
            <div>
                <MenuItem
                    onClick={toggleOpen}
                    containerElement={<Link to={'/'}/>}
                    primaryText={'Home'}
                />
                <MenuItem
                    onClick={toggleOpen}
                    containerElement={<Link to={'/feed'}/>}
                    primaryText={'Feed'}
                />
                <MenuItem
                    onClick={toggleOpen}
                    containerElement={<Link to={'/create'}/>}
                    primaryText={'Create Post'}
                />
                <MenuItem
                    onClick={toggleOpen}
                    containerElement={<Link to={'/profile'}/>}
                    primaryText={'Profile'}
                />
                <MenuItem
                    onClick={signOut}
                    primaryText={'Sign Out'}
                />
            </div>
        );
    }
    return (
        <div>
            <MenuItem
                onClick={toggleOpen}
                containerElement={<Link to={'/'}/>}
                primaryText={'Home'}
            />
            <MenuItem
                onClick={toggleOpen}
                containerElement={<Link to={'/signin'}/>}
                primaryText={'Sign In'}
            />
            <MenuItem
                onClick={toggleOpen}
                containerElement={<Link to={'/signup'}/>}
                primaryText={'Sign Up'}
            />
        </div>
    );
};

navLinks.propTypes = {
    authenticated: PropTypes.bool,
    signOut: PropTypes.func,
    toggleOpen: PropTypes.func
};

export default navLinks;

