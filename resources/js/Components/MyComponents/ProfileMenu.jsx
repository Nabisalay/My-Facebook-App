import { Link } from "@inertiajs/react";
import { Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
const ProfileMenu = ({open, setOpen, setOpenImageModal}) => {
    return (
        <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            open={open}
            onClose={e => setOpen(false)}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
        >
            <MenuItem component="form">
                <Typography
                    component="label"
                    type="file"
                    onClick={(e) => setOpenImageModal(true)}
                >
                    Add Image
                </Typography>
            </MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem>
                <Link href={route("logout")} method="post" as="button">
                    Logout
                </Link>
            </MenuItem>
        </Menu>
    );
};

export default ProfileMenu;