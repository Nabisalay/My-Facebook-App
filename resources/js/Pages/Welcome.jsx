import Feed from "@/Components/MyComponents/Feed";
import Rightbar from "@/Components/MyComponents/Rightbar";
import AppLayout from "@/Components/MyComponents/AppLayout";
import { router } from "@inertiajs/react";



function Welcome({posts}) {

    return (
        <AppLayout>
            <Feed posts={posts}/>
            <Rightbar />
        </AppLayout>
    );
}

export default Welcome;
