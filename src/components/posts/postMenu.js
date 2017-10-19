import React from 'react';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const postMenu = (props) => (
    <IconMenu
        style={props.style}
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem primaryText="Remove Post" onClick={props.onRemove} />
    </IconMenu>
);

postMenu.propTypes = {
    style: PropTypes.object,
    onRemove: PropTypes.func
};

export default postMenu;