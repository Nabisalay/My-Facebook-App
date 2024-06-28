import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Modal,
    Typography,
} from "@mui/material";
import React from "react";
import { VisuallyHiddenInput } from "./Navbar";
import { useForm, usePage } from "@inertiajs/react";

const ProfileUploadModal = ({ openImageModal, setOpenImageModal }) => {
    const user = usePage().props.auth.user;
    const { data, setData, post, processing, errors, reset } = useForm({
        imageFile: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("addProfile"), {
            onSuccess: () => {
                console.log("sucess");
                reset("imageFile");
            },
            onError: () => {
                console.log("error");
                reset("imageFile");
            },
        });
    };
    return (
        <Modal
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            open={openImageModal}
            onClose={(e) => setOpenImageModal(false)}
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
                    borderRadius: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <Typography variant="h6" color={`gray`}>
                    Upload Profile Image
                </Typography>
                <Avatar
                    alt={user.name}
                    src={`/storage/${user.profile_img}`}
                    sx={{
                        width: 100,
                        height: 100,
                        bgcolor: "secondary.main",
                    }}
                />
                <Box>
                    <ButtonGroup
                        component={"form"}
                        onSubmit={handleSubmit}
                        width=""
                        fullWidth
                        variant="contained"
                        aria-label="Basic button group"
                    >
                        <Button component="label" variant="contained">
                            Upload
                            <VisuallyHiddenInput
                                onChange={(e) =>
                                    setData("imageFile", e.target.files[0])
                                }
                                type="file"
                            />
                        </Button>

                        <Button
                            type="submit"
                            disabled={processing}
                            sx={{
                                "&:disabled": {
                                    bgcolor: "gray",
                                },
                            }}
                        >
                            save{" "}
                        </Button>
                    </ButtonGroup>
                    {errors.imageFile && (
                        <Typography color="red">{errors.imageFile}</Typography>
                    )}
                </Box>
            </Box>
        </Modal>
    );
};

export default ProfileUploadModal;