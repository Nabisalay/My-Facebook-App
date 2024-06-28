import FriendRequest from "@/Components/MyComponents/FriendRequet";
import { router, usePage } from "@inertiajs/react";
import React from "react";
import AppLayout from "@/Components/MyComponents/AppLayout";

const FriendRequests = ({ friendRequests }) => {



    return (
        <AppLayout>
            <FriendRequest friend={friendRequests} />
        </AppLayout>
    );
};

export default FriendRequests;
