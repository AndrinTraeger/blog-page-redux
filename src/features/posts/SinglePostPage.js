import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons"

import { Link, useParams } from "react-router-dom";


const SinglePostPage = () => {

    const { postId } = useParams()

    const post = useSelector((state) => selectPostById(state, Number(postId)))

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
        <article className="singleView">
            <h2 className="titleSinglePost">{post.title.substring(0, 30)}...</h2>
            <p>{post.body}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
                <Link to={`/post/edit/${post.id}`}><br/><br/> Edit Post</Link>
                <Link className="view" to="/"> <br/><br/>Go Back</Link>
            </p>
            <ReactionButtons post={post} />
        </article>
    )
}

export default SinglePostPage;