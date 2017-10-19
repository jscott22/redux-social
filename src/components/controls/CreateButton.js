import React from 'react';
import {withRouter} from 'react-router-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';

const style = {
    position: 'fixed',
    zIndex: 99,
    bottom: '3%',
    right: '7%'
};

const navigate = (history) => {
    history.push('/create');
};

const createButton = ({history}) => {
    return(
        <FloatingActionButton
            secondary={true}
            style={style}
            onClick={navigate.bind(null, history)}
        >
            <ContentCreate />
        </FloatingActionButton>
    );
};

export default withRouter(createButton);