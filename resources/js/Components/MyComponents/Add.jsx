import React from "react";
import {
    Add as AddIcon,
    DateRange,
    EmojiEmotions,
    Image,
    PersonAdd,
    VideoCameraBack,
} from "@mui/icons-material";
import { useState } from "react";
import {
    Avatar,
    Button,
    ButtonGroup,
    Fab,
    Modal,
    Stack,
    TextField,
    Tooltip,
    Typography,
    styled,
    Box,
    FormHelperText,
    Drawer,
    Paper,
    Dialog,
    Slide,
    Popover,
} from "@mui/material";
import { VisuallyHiddenInput } from "./Navbar";
import { Fragment } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { useEffect } from "react";

export const StyledModel = styled(Modal)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:focus": {
        outline: "none",
    },
});
const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
});

const Add = () => {
    const user = usePage().props.auth.user;
    const [error, setError] = useState([]);
    const { data, setData, post, processing, errors, reset } = useForm({
        postText: "",
        postImage: "",
        postVideo: "",
    });
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(false);

    const handlePostSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        axios.post(
            route("add.post"),
            {
                postText: data.postText,
                postImage: data.postImage,
                postVideo: data.postVideo,
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        )
        .then((res) => {
            console.log(res);
            if (res.data.success) {
                console.log(res);
                setOpen(false);
                setError([]);
            }
        })
        .catch((err) => {
            console.log("i am error ", err);
            setError(err.response.data.errors);
            // console.log('i am error ', error)
        })
        .finally(() => {
            reset();
            setSelectedImage(false);
            setSelectedVideo(false);
        });
    };
    useEffect(() => {
        console.log(errors)
    }, [errors])
    const imageSelected = (e) => {
        const file = e.target.files[0];
        setData("postImage", file);
        setSelectedImage(!!file);
    };
    const videoSelected = (e) => {
        const file = e.target.files[0];
        setData("postVideo", file);
        setSelectedVideo(!!file);
    };

    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    const onEmojiClick = (emojiData) => {
        setData("postText", data.postText + emojiData.emoji);
    };
    return (
        <>
            <Tooltip
                onClick={(e) => setOpen(true)}
                title="Add Photo"
                sx={{
                    position: "fixed",
                    bottom: 20,
                    left: { xs: "calc(50% - 25px)", md: 30 },
                }}
            >
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Tooltip>
            <StyledModel
                open={open}
                onClose={(e) => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    component={"form"}
                    onSubmit={handlePostSubmit}
                    bgcolor={"background.default"}
                    color={"text.primary"}
                    sx={{
                        width: 400,
                        height: 320,
                        p: 3,
                        borderRadius: 5,
                    }}
                >
                    <Typography
                        variant="h6"
                        color={`gray`}
                        textAlign={`center`}
                    >
                        Create Post
                    </Typography>

                    <UserBox>
                        <Avatar
                            sx={{
                                width: 30,
                                height: 30,
                            }}
                            alt="Remy Sharp"
                            src={`/storage/${user.profile_img}`}
                        />
                        <Typography fontWeight={500} variant="span">
                            {`${user.firstName} ${user.lastName}`}
                        </Typography>
                    </UserBox>
                    <TextField
                        sx={{
                            width: "100%",
                        }}
                        error={!!error.postText}
                        helperText={!!error.postText ? error.postText : ""}
                        id="standard-multiline-static"
                        multiline
                        rows={3}
                        placeholder="What's on your mind?"
                        variant="standard"
                        value={data.postText}
                        onChange={(e) => setData("postText", e.target.value)}
                    />
                    <Stack direction={`row`} gap={1} mt={2} mb={3}>
                        <EmojiEmotions
                            onClick={(e) => setOpenEmojiPicker(true)}
                            color="warning"
                        />

                        <Button
                            disabled={selectedVideo && "disabled"}
                            component="label"
                            tabIndex={-1}
                            sx={{ minWidth: 0, p: 0, m: 0 }}
                        >
                            <Image color={selectedVideo ? "disabled" : ""} />
                            <VisuallyHiddenInput
                                type="file"
                                accept="image/*"
                                onChange={imageSelected}
                            />
                        </Button>

                        <Button
                            disabled={selectedImage && "disabled"}
                            component="label"
                            tabIndex={-1}
                            sx={{ minWidth: 0, p: 0, m: 0 }}
                        >
                            <VideoCameraBack
                                color={selectedImage ? "disabled" : "success"}
                            />
                            <VisuallyHiddenInput
                                type="file"
                                accept="video/*"
                                onChange={videoSelected}
                            />
                        </Button>
                        <PersonAdd color="error" />
                        {!!error.postImage && (
                            <FormHelperText sx={{ color: "red" }}>
                                {error.postImage}
                            </FormHelperText>
                        )}
                        {!!error.postVideo && (
                            <FormHelperText sx={{ color: "red" }}>
                                {error.postVideo}
                            </FormHelperText>
                        )}
                        {selectedImage && (
                            <FormHelperText sx={{ fontSize: "0.9rem" }}>
                                * Image Selected *
                            </FormHelperText>
                        )}
                        {selectedVideo && (
                            <FormHelperText sx={{ fontSize: "0.9rem" }}>
                                * Video Selected *
                            </FormHelperText>
                        )}
                    </Stack>

                    <ButtonGroup
                        fullWidth
                        variant="contained"
                        aria-label="Basic button group"
                        // mb={2}
                    >
                        <Button type="submit">Post</Button>
                        <Button sx={{ width: "100px" }}>
                            <DateRange />
                        </Button>
                    </ButtonGroup>
                </Box>
            </StyledModel>
            <Popover
                open={openEmojiPicker}
                onClose={(e) => setOpenEmojiPicker(false)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <Paper>
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                </Paper>
            </Popover>
        </>
    );
};

export default Add;
