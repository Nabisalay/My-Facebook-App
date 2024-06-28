import { usePage } from "@inertiajs/react";
import { Mail, Menu, Notifications, Pets } from "@mui/icons-material";
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    IconButton,
    InputBase,
    Toolbar,
    Typography,
    styled,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import axios from "axios";
import NotificationsModal from "./NotificationsModal";
import ProfileUploadModal from "./ProfileUploadModal";
import ProfileMenu from "./ProfileMenu";

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
});

export const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const Search = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    padding: "0 10px",
    borderRadius: theme.shape.borderRadius,
    width: "40%",
}));

const Icons = styled("div")(({ theme }) => ({
    display: "none",
    alignItems: "center",
    gap: "20px",
    [theme.breakpoints.up("sm")]: {
        display: "flex",
    },
}));
const UserBox = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    [theme.breakpoints.up("sm")]: {
        display: "none",
    },
}));

const Navbar = ({ handleNotificiationClick, setOpenSidebar }) => {
    const [open, setOpen] = useState(false);
    const user = usePage().props.auth.user;
    const [openImageModal, setOpenImageModal] = useState(false);

    const [openNotification, setOpenNotification] = useState(false);

    const [notificatonCount, setNotificationCount] = useState(
        usePage().props.notificatonCount
    );

    const handleOpenNotification = (e) => {
        axios
            .post(route("sawNotifications"))
            .then((res) => {
                if (res.data.success) {
                    setNotificationCount(0);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        setOpenNotification(true);
    };
    // console.log(user.id)

    return (
        <React.Fragment>
            <AppBar position="sticky">
                <StyledToolbar>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <IconButton
                        onClick={e => setOpenSidebar(true)}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2,
                                display: { xs: "block", md: "none" },
                             }}
                        >
                            <Menu />
                        </IconButton>
                        <Typography
                            variant="h6"
                            sx={{
                                display: { xs: "none", sm: "block" },
                            }}
                        >
                            My App
                        </Typography>
                        <Pets
                        sx={{
                            display: { xs: "block", sm: "none" },
                        }}
                    />
                    </Box>
                    
                    <Search>
                        <InputBase placeholder="search..." />
                    </Search>
                    <Icons>
                        <Badge badgeContent={4} color="error">
                            <Mail />
                        </Badge>
                        <Badge badgeContent={notificatonCount} color="error">
                            <Notifications onClick={handleOpenNotification} />
                        </Badge>
                        <Avatar
                            sx={{
                                width: 30,
                                height: 30,
                            }}
                            alt={user.firstName}
                            src={`/storage/${user.profile_img}`}
                            onClick={(e) => setOpen(true)}
                        />
                    </Icons>
                    <UserBox onClick={(e) => setOpen(true)}>
                        <Avatar
                            sx={{
                                width: 30,
                                height: 30,
                            }}
                            alt={user.firstName}
                            src={`/storage/${user.profile_img}`}
                        />
                        <Typography variant="span">{user.firstName}</Typography>
                    </UserBox>
                </StyledToolbar>
                <ProfileMenu
                    open={open}
                    setOpen={setOpen}
                    setOpenImageModal={setOpenImageModal}
                />
            </AppBar>
            <ProfileUploadModal
                openImageModal={openImageModal}
                setOpenImageModal={setOpenImageModal}
            />

            <NotificationsModal
                handleNotificiationClick={handleNotificiationClick}
                openNotification={openNotification}
                setOpenNotification={setOpenNotification}
                setNotificationCount={setNotificationCount}
            />
        </React.Fragment>
    );
};

export default Navbar;
