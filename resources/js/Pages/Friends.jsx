import AppLayout from "@/Components/MyComponents/AppLayout";
import Friend from "@/Components/MyComponents/Friend";
import React from "react";

const Friends = ({ friends }) => {
    return (
        <AppLayout>
            <Friend friend={friends} />
        </AppLayout>
    );
};

export default Friends;
