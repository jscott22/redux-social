import React from 'react';
import Avatar from 'material-ui/Avatar';
import Face from 'material-ui/svg-icons/action/face';


const style = {
    textAlign: "center"
};

const getAvatar = (avatar) => (
    avatar
        ? <Avatar size={200} src={avatar}/>
        : <Avatar size={200} icon={<Face/>}/>
);

export default ({profile}) => {
    return (
        <div style={style}>
            {getAvatar(profile.avatar)}
            <h2>
                {profile.firstName} {profile.lastName}
            </h2>
            <h4>
                {profile.isAdmin ? "Admin" : "User"}
            </h4>
        </div>
    )
}