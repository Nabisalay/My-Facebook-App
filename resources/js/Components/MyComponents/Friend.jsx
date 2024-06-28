import { router } from "@inertiajs/react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardActionArea,
    // CardActions,
    CardContent,
    CardMedia,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Friend = ({ friend }) => {
    const sendRequest = (e, userId) => {
        e.preventDefault();
        const data = {
            receiver_id: userId,
        };
        router.post("/friend/request", data, {
            preserveScroll: true,
        });
    };

    const cancelRequest = (e, userId) => {
        e.preventDefault();
        const data = {
            receiver_id: userId,
        };
        router.post(route("cancelRequest"), data, {
            preserveScroll: true,
        });
    };

    const [friendArray, setFriendArray] = useState([]);
    useEffect(() => {
        if (typeof friend === "object" && !Array.isArray(friend)) {
            setFriendArray(Object.values(friend));
        } else {
            setFriendArray(friend);
        }
    }, [friend]);
    return (
        <Box
            flex={4}
            sx={{
                p: { sm: 0, md: 2 },
                minHeight: "90vh",
            }}
        >
            <Grid
                container
                sx={{
                    justifyContent: { xs: "center", sm: "start" },
                    p: { sm: 0, md: 2 },
                }}
            >
                {friendArray.length < 1 ? (
                    <Box
                        sx={{
                            height: "85vh",
                        }}
                    >
                        <Alert severity="info" variant="filled">
                            There is nothing for you today
                        </Alert>
                    </Box>
                ) : (
                    friendArray.map((person) => (
                        <Grid item sm={6} xs={12} p={2} key={person.id}>
                            <Paper>
                                <Card>
                                    <CardActionArea>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            {person.profile_img ? (
                                                <CardMedia
                                                    component="img"
                                                    sx={{
                                                        maxHeight: 300,
                                                        minHeight: 300,
                                                    }}
                                                    image={`/storage/${person.profile_img}`}
                                                    alt={person.name}
                                                />
                                            ) : (
                                                <svg
                                                    style={{
                                                        maxHeight: "300px",
                                                        minHeight: 300,
                                                    }}
                                                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiAvatar-fallback css-10mi8st-MuiSvgIcon-root-MuiAvatar-fallback"
                                                    focusable="false"
                                                    aria-hidden="true"
                                                    viewBox="0 0 24 24"
                                                    data-testid="PersonIcon"
                                                >
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                                                </svg>
                                            )}
                                        </Box>
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h6"
                                                component="div"
                                            >
                                                {`${person.firstName} ${person.lastName}`}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <Stack spacing={2} px={3} pb={1}>
                                        {person.request_received.length == 0 ? (
                                            <>
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    onClick={(e) =>
                                                        sendRequest(
                                                            e,
                                                            person.id
                                                        )
                                                    }
                                                >
                                                    Add Friend
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    fullWidth
                                                >
                                                    Remove
                                                </Button>
                                            </>
                                        ) : (
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                onClick={(e) =>
                                                    cancelRequest(e, person.id)
                                                }
                                            >
                                                Cancel
                                            </Button>
                                        )}
                                    </Stack>
                                </Card>
                            </Paper>
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
};

export default Friend;