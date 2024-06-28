import { PersonAdd } from "@mui/icons-material";
import {
    Avatar,
    Button,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";
import React from "react";

const PostLikeList = ({ like, user }) => {
    return (
        <ListItem

        >
            <ListItemAvatar>
                <Avatar src={`/storage/${like.user.profile_img}`} />
            </ListItemAvatar>
            <ListItemText
                primary={`${like.user.firstName} ${like.user.lastName}`}
            />
        </ListItem>
    );
};
export default PostLikeList;
