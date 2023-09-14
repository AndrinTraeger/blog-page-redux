import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, updatePost, deletePost } from "./postsSlice";
import { useParams, useNavigate } from "react-router-dom";

import { selectAllUsers } from "../users/usersSlice";

const EditPostForm = () =>{
    const {postId} = useParams();
    const navigate = useNavigate();

    const post = useSelector((state) => selectPostById(state, Number(postId)))
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(post?.title)
    const[content, setContent] = useState(post?.body)
    const [userId, setUserId] = useState(post?.userId)
    const [requestStatus, setRequestStatus] = useState('idle')

    const dispatch = useDispatch()

    if(!post){
        return(
            <section>
                <h2>No post found!</h2>
            </section>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

    const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle'

    const onSavePostClicked = () => {
        if (canSave){
            try{
                setRequestStatus('pending')
                dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions})).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            }catch(err){
                console.log("Failed to save changes!", err)
            }finally{
                setRequestStatus('idle')
            }
        }
    }

    const userOptions = users.map(user =>(
        <option
            key={user.id}
            value={user.id}>
            {user.name}
            </option>
    ))

    const onDeletePostClicked = () => {
        try{
            const check = window.confirm("Are you sure you want to delete this Post?")

            if(check === true){
            setRequestStatus('pending')
            dispatch(deletePost({ id: post.id})).unwrap()

            setTitle('')
            setContent('')
            setUserId('')
            navigate("/")
            }
        } catch(err){
            console.log(`Failed to delete Post: ${post.title}`, err)
        } finally {
            setRequestStatus('idle')
        }
    }

    const onCancelEditClicked = () => {
        const check = window.confirm("Are you sure you want to cancel all changes?")

        if(check === true){
            navigate(`/post/${postId}`)
        }
        
        return
    }

    return(
        <section className="editForms">
            <h2>Edit Post 
                <button
                type="button"
                className="cancelBtn"
                onClick={onCancelEditClicked}
                >
                ❌
                </button>
            </h2>
            <form>
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" defaultValue={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {userOptions}
                </select>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="ostTitle"
                    value={title}
                    onChange={onTitleChanged}/>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}/>
                <button
                    type="button"
                    className="saveBtn"
                    onClick={onSavePostClicked}
                    disabled={!canSave}>
                        Save Changes
                </button>
                <button
                    type="button"
                    className="deleteBtn"
                    onClick={onDeletePostClicked}>
                        Delete        
                </button>   
            </form>
        </section>
    )
}

export default EditPostForm;