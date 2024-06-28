import InputError from "@/Components/InputError";
import { Link, useForm } from "@inertiajs/react";
import { LockOutlined } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";

const Login = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("login"));
    }
    return (
        <Stack direction="row" justifyContent={"center"} minHeight={"100vh"}>
            <Box
                sx={{
                    display: { xs: "none", sm: "flex" },
                    flex: { sm: 0.4, md: 0.6 },
                    justifyContent: "center",
                }}
            >
                <img style={{
    width: "100vw",   // 100% of viewport width
    height: "100vh",  // 100% of viewport height
    objectFit: "cover",
    objectPosition: "center",
  }} src="https://c0.wallpaperflare.com/preview/344/820/937/red-sports-car-on-park-beside-road-with-tree-lines-during-daytime.jpg" />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flex: { xs: 1, sm: 0.6, md: 0.5 },
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
                    <TextField 
                        label="Email"
                        error={errors.email}
                        value={data.email}
                        onChange={(event) =>
                            setData("email", event.target.value)
                        }
                        fullWidth
                        sx={{ mb: 3 }}
                        helperText={errors.email ? errors.email : ""}
                    />
                    <TextField
                        label="Password"
                        error={errors.password}
                        type="password"
                        value={data.password}
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={(event) =>
                            setData("password", event.target.value)
                        }
                        helperText={errors.password ? errors.password : ""}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={processing}
                        sx={{
                            mt: 3,
                            mb: 2,
                            "&:disabled": {
                                bgcolor: "gray",
                            },
                        }}
                    >
                        Sign In
                    </Button>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            px: 1
                        }}
                    >
                        <Typography
                            sx={{
                                color: "primary.main",
                                fontSize: {sm: "13px", md:"14px"},
                            }}
                        >
                            <Link href="#">
                                Forgot password?
                            </Link>
                        </Typography>
                        <Typography
                            sx={{
                                color: "primary.main",
                                fontSize: {sm: "13px", md:"14px"},
                            }}
                        >
                            <Link href={route("register")}>
                                Don't have an account? Sign Up
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Stack>
    );
};

export default Login;
