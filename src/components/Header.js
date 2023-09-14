import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useParams} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "../features/posts/postsSlice";
import { useDispatch} from "react-redux";
import { getCount } from "../features/posts/postsSlice";
import { increaseCount } from "../features/posts/postsSlice";

const Header = () => {
  const dispatch = useDispatch();
  const count = useSelector(getCount);
  const {postId} = useParams()
  const location = useLocation();
  const navigate = useNavigate();

  const onEditTryToNavigateToHome = () =>{
  if(location.pathname === `/post/edit/${postId}` || location.pathname === `/post`){
    const confirm = window.confirm("Are you sure you want to cancel all changes?")
    if(confirm === true){
      navigate("/")
    }
  }
  else{
    navigate("/")
  }

}

const onEditTryToNavigateToUsers = () =>{
  if(location.pathname === `/post/edit/${postId}` || location.pathname === `/post`){
    const confirm = window.confirm("Are you sure you want to cancel all changes?")
    if(confirm === true){
      navigate("/user")
    }
  }
  else{
    navigate("/user")
  }
}

const onEditTryToNavigateToNewPost = () =>{
  if(location.pathname === `/post/edit/${postId}` || location.pathname === `/post`){
    const confirm = window.confirm("Are you sure you want to cancel all changes?")
    if(confirm === true){
      navigate("/post")
    }
  }
  else{
    navigate("/post")
  }
}
  return (
    <header className="Header">
        <img src="https://0.gravatar.com/avatar/927bec9e743dd1839159813a9420baa3286a6c2691f133d8357aebb985e7aa3e?s=120&d=identicon&r=G" alt="Twittergram"></img>
        <h1>Twittergram</h1>
        <nav>
            <ul>
                <button className="homeBtn" onClick={onEditTryToNavigateToHome}>Home</button><br/>
                <button className="homeBtn" onClick={onEditTryToNavigateToUsers}>Users</button><br/>
                <button className="homeBtn" onClick={onEditTryToNavigateToNewPost}>Add New Post</button>
            </ul>
            <button
            onClick={() => dispatch(increaseCount())}
            >{count}</button>
        </nav>
    </header>
  )
}

export default Header;