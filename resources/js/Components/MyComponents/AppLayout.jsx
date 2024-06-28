import Add from "@/Components/MyComponents/Add";
import Feed from "@/Components/MyComponents/Feed";
import Navbar from "@/Components/MyComponents/Navbar";
import Rightbar from "@/Components/MyComponents/Rightbar";
import Sidebar from "@/Components/MyComponents/Sidebar";
import { useState } from "react";
import { Box, Stack, ThemeProvider, createTheme } from "@mui/material";
import { router, usePage } from "@inertiajs/react";
import { useEffect } from "react";

function AppLayout({ children, notificiationClick }) {
    const [mode, setMode] = useState(localStorage.getItem('themeMode') || 'light');
    useEffect(() => {
        localStorage.setItem('themeMode', mode); // Store state change
      }, [mode]);

    const DarkTheme = createTheme({
        palette: {
            mode: mode,
        },
    });

    const user = usePage().props.auth.user;
    Echo.channel("user" + user.id).listen("RequestReceivedEvent", (e) => {
        console.log("New friend request received!"); // For debugging
        router.reload();
    });
    
    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <ThemeProvider theme={DarkTheme}>
            <Box bgcolor={"background.default"} color={"text.primary"}>
                <Navbar handleNotificiationClick={notificiationClick} setOpenSidebar={setOpenSidebar}/>
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                >
                    <Sidebar setMode={setMode} mode={mode} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
                    {children}
                </Stack>
                <Add />
            </Box>
        </ThemeProvider>
    );
}

export default AppLayout;
