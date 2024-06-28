import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { router, usePage } from "@inertiajs/react";
import {
    Avatar,
    Badge,
    Box,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Menu,
    Modal,
    Paper,
    Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";



export const StyledBadge = styled(Badge)(({ theme, badgecolor }) => ({
    "& .MuiBadge-badge": {
        backgroundColor: badgecolor,
        color: badgecolor,
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""',
        },
    },

}));

const NotificationsModal = ({
    openNotification,
    setOpenNotification,
    setNotificationCount,
}) => {
    const pageProps = usePage().props;
    const user = pageProps.auth.user;
    const theme = useTheme();
    const [notifications, setNotifications] = useState(pageProps.notifications);

    const friends = pageProps.friends;

    useEffect(() => {
        const notifyChannel = Echo.private(`App.User.${user.id}`);
        const handleNewNotification = (notification) => {
            setNotificationCount(
                (prevNotificatonCount) =>
                    (prevNotificatonCount = prevNotificatonCount + 1)
            );
            setNotifications((prevNotificatioins) => [
                notification,
                ...prevNotificatioins,
            ]);
        };

        notifyChannel.notification(handleNewNotification);

        return () => {
            notifyChannel.stopListening("notification");
        };
    }, []);
    
    // useEffect(() => {
    //     console.log("Notifications state changed:", notifications);
    // }, [notifications])

    const showNotificationPost = (postId, notificationId) => {
        router.get(route("showNotificationPost"), {
            notificationId: notificationId,
            postId: postId,
        }, {preserveState: true});
        setOpenNotification(false);
        
        setNotifications((prevNotifications) => {
            const updatedNotifications = prevNotifications.map(
                (notification) => {
                    if (notification.id === notificationId) {
                        return {
                            ...notification,
                            read_at: dayjs().toISOString(),
                        };
                    }
                    return notification;
                }
            );
            return updatedNotifications;
        });
    };



    return (

        <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={openNotification}
        onClose={e => setOpenNotification(false)}
        anchorOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        sx={{
            mt: 7,
        }}
        >
            {/* 
            > */}
                <List
                    sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                        maxHeight: "400px",
                        overflowY: "auto",
                    }}
                >
                    {notifications.length < 1 ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h6" color="error">
                                No notifications for today
                            </Typography>
                        </Box>
                    ) : (
                        notifications.map((notification) => (
                            <React.Fragment key={notification.id}>
                                {friends.map((friend) =>
                                    notification.data.userId === friend.id ? (
                                        <ListItem
                                            key={notification.id}
                                            alignItems="flex-start"
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                textAlign: "center",
                                                cursor: "pointer", // Set default cursor to pointer
                                                "&:hover": {
                                                    // Hover styles
                                                    backgroundColor:
                                                        theme.palette.action
                                                            .hover, // Use MUI theme for hover color
                                                },
                                            }}
                                            onClick={(e) =>
                                                showNotificationPost(
                                                    notification.data.postId,
                                                    notification.id
                                                )
                                            }
                                        >
                                            <ListItemAvatar>
                                                <StyledBadge
                                                badgecolor ={'red'}
                                                    overlap="circular"
                                                    anchorOrigin={{
                                                        vertical: "top",
                                                        horizontal: "right",
                                                    }}
                                                    variant={
                                                        notification.read_at
                                                            ? ""
                                                            : "dot"
                                                    }
                                                >
                                                    <Avatar
                                                        alt={friend.firstName}
                                                        src={`/storage/${friend.profile_img}`}
                                                    />
                                                </StyledBadge>
                                            </ListItemAvatar>
                                            <ListItemText
                                                secondary={
                                                    <Fragment>
                                                        <Typography
                                                            sx={{
                                                                display:
                                                                    "inline",
                                                            }}
                                                            component="span"
                                                            variant="body1"
                                                            color="text.primary"
                                                        >
                                                            {friend.firstName +
                                                                " " +
                                                                friend.lastName +
                                                                " "}
                                                        </Typography>
                                                        {
                                                            notification.data
                                                                .message
                                                        }
                                                    </Fragment>
                                                }
                                            />
                                        </ListItem>
                                    ) : null
                                )}
                                <Divider variant="inset" component="li" />
                            </React.Fragment>
                        ))
                    )}
                </List>
            {/* </Paper> */}
        </Menu>
    );
};

export default NotificationsModal;
