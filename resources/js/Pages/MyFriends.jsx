import { router, usePage } from "@inertiajs/react";
import React from "react";
import AppLayout from "@/Components/MyComponents/AppLayout";
import MyFriend from "@/Components/MyComponents/MyFriend";

const FriendRequests = ({ MyFriends }) => {


    return (
        <AppLayout>
            <MyFriend friend={MyFriends} />
        </AppLayout>
    );
};

export default FriendRequests;
