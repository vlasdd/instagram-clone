import { useOutletContext } from "react-router-dom";
import PostType from "../types/post-type";

const usePosts = () => useOutletContext<{posts: PostType[], changePosts: any}>()

export default usePosts;