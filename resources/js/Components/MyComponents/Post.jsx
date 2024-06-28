import React from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Checkbox,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";
import {
    Delete,
    Favorite,
    FavoriteBorder,
    Folder,
    MoreVert,
    PersonAdd,
    Share,
} from "@mui/icons-material";
import dayjs from "dayjs";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { useEffect } from "react";
import { StyledModel } from "@/Components/MyComponents/Add";
import PostLikeList from "./PostLikeList";
import axios from "axios";
import { useRef } from "react";

const Post = ({ post }) => {
    const formattedDate = dayjs(post.created_at).format(
        "MMMM D, YYYY h:mm:ss A"
    );
    const [fullPost, setFullPost] = useState(post);
    const user = usePage().props.auth.user;
    const userlike = fullPost.likes.filter((like) => like.user_id == user.id);
    const [likes, setLikes] = useState(fullPost.likes.length);
    const [checked, setChecked] = useState(userlike.length > 0 ? true : false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setLikes(fullPost.likes.length);
        setChecked(userlike.length > 0 ? true : false);
    }, [fullPost.likes.length, userlike.length]);

    const likedIt = (e, post_id) => {
        e.preventDefault();
        axios
            .post(route("likePost"), {
                post_id: post_id,
                user_id: user.id,
                liked: true,
            })
            .then((res) => {
                console.log(res);
                if (res.data.success) {
                    setFullPost((prevFullPost) => ({
                        ...prevFullPost,
                        likes: [...prevFullPost.likes, res.data.data],
                    }));
                } else {
                    setFullPost((prevFullPost) => ({
                        ...prevFullPost,
                        likes: prevFullPost.likes.filter(
                            (like) => like.user_id !== res.data.data
                        ),
                    }));
                }
            })
            .catch((err) => {
                console.log("i am dump", err.response.config.data);
            });
    };
    useEffect(() => {
        setFullPost(post);
    }, [post]);
    const [dense, setDense] = useState(false);



    return (
        <Card sx={{ m: { xs: 0, sm: 5 } }}>
            <CardHeader
                avatar={
                    <Avatar src={`/storage/${fullPost.user.profile_img}`} />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>
                }
                title={fullPost.user.firstName + " " + fullPost.user.lastName}
                subheader={formattedDate}
            />
            {fullPost.type === "imagePost" && (
                <CardMedia
                    component="img"
                    height="20%"
                    image={`/storage/${fullPost.image}`}
                    alt={fullPost.description}
                    sx={{ maxHeight: 500 }}
                />
            )}
            {fullPost.type === "videoPost" && (
                <CardMedia
                    component="video"
                    controls
                    src={`/storage/${fullPost.image}`}
                    alt={fullPost.description || "Post video"}
                    sx={{ maxHeight: 500 }}
                />
            )}
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {fullPost.description}
                </Typography>
            </CardContent>

            <CardActions disableSpacing>
                <IconButton
                    aria-label="add to favorites"
                    onClick={(e) => likedIt(e, fullPost.id)}
                >
                    <Checkbox
                        icon={
                            checked ? (
                                <Favorite sx={{ color: "red" }} />
                            ) : (
                                <FavoriteBorder />
                            )
                        }
                    />
                </IconButton>
                <Typography
                    variant="body2"
                    sx={{ cursor: "pointer" }}
                    onClick={(e) => setOpen(true)}
                >
                    {likes} like
                </Typography>
                <IconButton aria-label="share">
                    <Share />
                </IconButton>
            </CardActions>
            <StyledModel
                open={open}
                onClose={(e) => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    bgcolor={"background.default"}
                    color={"text.primary"}
                    sx={{
                        width: 400,
                        height: 320,
                        p: 3,
                        borderRadius: 2,
                        overflowY: "auto",
                    }}
                >
                    <Typography variant="h6" gutterBottom textAlign={"center"}>
                        Post Liked By
                    </Typography>
                    <Divider />
                    {likes.length == 0 ? (
                        "No Like"
                    ) : (
                        <List dense={dense}>
                            {fullPost.likes.map(
                                (like) =>
                                    like.user_id === user.id && (
                                        <PostLikeList
                                            key={like.id}
                                            like={like}
                                            user={user}
                                        />
                                    )
                            )}
                            {fullPost.likes.map(
                                (like) =>
                                    like.user_id !== user.id && (
                                        <PostLikeList
                                            key={like.id}
                                            like={like}
                                            user={user}
                                        />
                                    )
                            )}
                        </List>
                    )}
                </Box>
            </StyledModel>
        </Card>
    );
};
export default Post;
