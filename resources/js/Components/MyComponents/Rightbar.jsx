import React from "react";
import {
    Avatar,
    AvatarGroup,
    Divider,
    ImageList,
    ImageListItem,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    Box,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { StyledBadge } from "./NotificationsModal";
import { usePage } from "@inertiajs/react";
import { Fragment } from "react";

const Rightbar = () => {
    const user = usePage().props.auth.user;
    const friends = usePage().props.friends;
    const [onlineUsers, setOnlineUsers] = useState([]);
    useEffect(() => {
        Echo.join("online")
            .here((users) => {
                setOnlineUsers(users);
            })
            .joining((users) => {
                setOnlineUsers((prevOnlineUsers) => [
                    ...prevOnlineUsers,
                    users,
                ]);
            })
            .leaving((users) => {
                setOnlineUsers((prevOnlineUsers) => {
                    return prevOnlineUsers.filter(
                        (user) => user.id !== users.id
                    );
                });
            })
            .error((error) => {});

        return () => {
            Echo.leave("online");
        };
    }, []);
    // useEffect(() => {
    // }, [onlineUsers]);
    return (
        <Box
            flex={2}
            p={2}
            sx={{
                display: { xs: "none", md: "block" },
            }}
        >
            <Box
                position="fixed"
                width={250}
                sx={{ overflow: "auto", height: 500 }}
            >
                <Typography variant="h6" fontWeight={100}>
                    Online Friends
                </Typography>
                <AvatarGroup max={6}>
                    {onlineUsers.map((onlineUser) => {
                        if (onlineUser.id === user.id) {
                            return;
                        } else
                            return (
                                <StyledBadge
                                    key={onlineUser.id}
                                    badgecolor="#44b700"
                                    overlap="circular"
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right",
                                    }}
                                    variant={"dot"}
                                >
                                    <Avatar
                                        alt={onlineUser.firstName}
                                        src={`/storage/${onlineUser.profile_img}`}
                                    />
                                </StyledBadge>
                            );
                    })}
                </AvatarGroup>

                <Typography variant="h6" fontWeight={100} mt={2}>
                    Latest Conversations
                </Typography>
                <List
                    sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                    }}
                >
                    {friends.slice(0, 3).map((friend) => (
                        <Fragment  key={friend.id}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar
                                        alt={friend.firstName}
                                        src={`/storage/${friend.profile_img}`}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Brunch this weekend?"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: "inline" }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {friend.firstName + " " + friend.lastName}
                                            </Typography>
                                            {
                                                " — I'll be in your neighborhood doing errands this…"
                                            }
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </Fragment>
                    ))}


                </List>
            </Box>
        </Box>
    );
};

export default Rightbar;
