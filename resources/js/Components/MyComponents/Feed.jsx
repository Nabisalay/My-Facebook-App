import React from "react";
import Post from "./Post";
import { Box, Button, Fab, Modal, Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { router } from "@inertiajs/react";
import { ArrowUpward } from "@mui/icons-material";

const Feed = ({ posts }) => {
    const [allPosts, setAllPosts] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState(posts.next_page_url);
    const [loading, setLoading] = useState(false);
    const [newPosts, setNewPosts] = useState([]);
    const [newPostsAvailable, setNewPostsAvailable] = useState(false);

    const { ref, inView } = useInView({
        rootMargin: "200px",
    });
    // if(nextPageUrl) {
       
    // }

    useEffect(() => {
        const postChannel = Echo.channel("post-created");
        const NewPostCreated = (e) => {
            setNewPosts((prevPosts) => [e.newPost, ...prevPosts]);
            setNewPostsAvailable(true);
        };
        postChannel.listen("NewPostCreated", NewPostCreated);

        return () => {
            postChannel.stopListening("NewPostCreated", NewPostCreated);
            Echo.leaveChannel("post-created");
        };
    }, []);
    useEffect(() => {
        const channel = Echo.channel("post-like");
        const handlePostLikedEvent = (e) => {
            setAllPosts((prevPosts) =>
                prevPosts.map((post) => {
                    if (post.id === e.post) {
                        if (typeof e.like === "object" && e.like !== null) {
                        console.log('user')
                            return {
                                ...post,
                                likes: [...post.likes, e.like],
                            };
                        } else {
                        console.log('user1')

                            return {
                                ...post,
                                likes: post.likes.filter(
                                    (like) => like.user_id !== e.like
                                ),
                            };
                        }
                    }
                    return post;
                })
            );
        };

        channel.listen("PostLikedEvent", handlePostLikedEvent);

        return () => {
            channel.stopListening("PostLikedEvent", handlePostLikedEvent);
            Echo.leaveChannel("post-like");
        };
    }, []);

    useEffect(() => {
        setAllPosts(posts.data);
        setNextPageUrl(posts.next_page_url);
    }, [posts]);
    useEffect(() => {
        if (inView && nextPageUrl) {
            setLoading(true);
            axios
                .get(nextPageUrl)
                .then(function (response) {
                    setAllPosts((prevAllPosts) => [
                        ...prevAllPosts,
                        ...response.data.data,
                    ]);
                    setNextPageUrl(response.data.next_page_url);
                })
                .catch((error) => {
                    if (axios.isCancel(error)) return;
                    console.error("Error fetching new posts:", error);
                })
                .finally(function () {
                    setLoading(false);
                });
        }
    }, [inView, nextPageUrl]);
    const showNewPosts = () => {
        setAllPosts(prevPosts => [...newPosts, ...prevPosts])
        window.scrollTo({ top: 0, behavior: "smooth" });
        setNewPostsAvailable(false);
    }
    
    return (
        <>
            <Box flex={4} sx={{
                p: { xs: 0, md: 2},
                minHeight: "90vh"
            }}>
                {allPosts.map((post) => (
                    <Post post={post} key={post.id} />
                ))}
                {loading && <div>Loading...</div>}
                <div ref={ref}></div>
            </Box>
            {newPostsAvailable && (
                <Fab
                    variant="extended"
                    size="medium"
                    sx={{
                        position: "fixed",
                        bottom: 20,
                        left: "42%",
                        transform: "translateX(-50%)",
                    }}
                    onClick={showNewPosts}
                >
                    <ArrowUpward />
                    New Posts
                </Fab>
            )}
        </>
    );
};

export default Feed;
