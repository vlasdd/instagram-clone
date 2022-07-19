import { useOutletContext } from "react-router-dom";
import PostType from "types/postType";

const usePosts = () => useOutletContext<{posts: PostType[], changePosts: any}>()

export default usePosts;