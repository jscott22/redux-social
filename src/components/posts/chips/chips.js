import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';

import uuidv4 from 'uuid/v4';

const styles = {
    chip: {
        margin: '4px 2px'
    },
    label: {
        fontSize: 12,
        padding: '0 10px'
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        margin: '0 10px 10px'
    }
};

const chips = (props) => {
    return (
        <div style={styles.row}>
            {props.chips.map(chip => {
                return (
                    <Chip labelStyle={styles.label}
                          style={styles.chip}
                          key={uuidv4()}
                    >
                        {chip}
                    </Chip>
                );
            })}
        </div>
    );
};

chips.propTypes = {
    chips: PropTypes.array.isRequired
};

export default chips;

