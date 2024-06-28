import * as React from "react";
import { LockOutlined } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Container,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import dayjs from "dayjs";

// TODO remove, this demo shouldn't need to reset the theme.

const Register = () => {
    const { data, setData, post, processing, errors, reset, setError } =
        useForm({
            firstName: "",
            lastName: "",
            gender: "",
            dob: null,
            email: "",
            password: "",
        });

    const validateForm = () => {
        let isValid = true;

        if (!data.dob) {
            isValid = false;
            setError("dob", "Date of birth is required."); // Set error message
        }

        return isValid;
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (validateForm()) {
            post(route("register"));
        }
    }
    const today = dayjs();
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                value={data.firstName}
                                onChange={(e) =>
                                    setData("firstName", e.target.value)
                                }
                                error={!!errors.firstName}
                                helperText={
                                    errors.firstName ? errors.firstName : ""
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                value={data.lastName}
                                onChange={(e) =>
                                    setData("lastName", e.target.value)
                                }
                                error={!!errors.lastName}
                                helperText={
                                    errors.lastName ? errors.lastName : ""
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth error={!!errors.gender}>
                                <InputLabel id="demo-simple-select-label">
                                    Gender
                                </InputLabel>
                                <Select
                                    label="Gender"
                                    value={data.gender}
                                    onChange={(e) =>
                                        setData("gender", e.target.value)
                                    }
                                >
                                    <MenuItem value={"Male"}>Male</MenuItem>
                                    <MenuItem value={"Female"}>Female</MenuItem>
                                    <MenuItem value={"undefined"}>
                                        Nather not say
                                    </MenuItem>
                                </Select>
                                {errors.gender && (
                                    <FormHelperText>
                                        {errors.gender}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date of birth"
                                    value={data.dob}
                                    onChange={(newDob) =>
                                        setData("dob", newDob)
                                    }
                                    maxDate={today}
                                />
                                {errors.dob && (
                                    <FormHelperText sx={{ color: "#d32f2f" }}>
                                        {errors.dob}
                                    </FormHelperText>
                                )}
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                label="Email Address"
                                error={!!errors.email}
                                helperText={errors.email ? errors.email : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                label="Password"
                                type="password"
                                error={!!errors.password}
                                helperText={
                                    errors.password ? errors.password : ""
                                }
                            />
                        </Grid>
                    </Grid>
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
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href={route("login")}>
                                <Typography sx={{
                                    color: "primary.main",
                                    fontSize: "0.9rem"
                                    }}>
                                    Already have an account? Sign in
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
