import Feed from "@/Components/MyComponents/Feed";
import Rightbar from "@/Components/MyComponents/Rightbar";
import AppLayout from "@/Components/MyComponents/AppLayout";
import { router } from "@inertiajs/react";
import Post from "@/Components/MyComponents/Post";



function SinglePost({post}) {
console.log(post.created_at);
    return (
        <AppLayout>
            <Post post={post}/>
            <Rightbar />
        </AppLayout>
    );
}

export default SinglePost;
