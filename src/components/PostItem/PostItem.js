import { useNavigate } from "react-router-dom";
import MyButton from "../UI/button/MyButton";

import './postItem.css';

const PostItem = (props) => {
  const router = useNavigate();

  return (
    <div>
      <div className="post">
        <div className="post__content">
          <div className="post__name">{props.post.id}. {props.post.title}</div>
          <div className="post__body">
            {props.post.body}
          </div>
        </div>
        <div className="post__btns">
          <MyButton onClick={() => router(`/posts/${props.post.id}`)}n>Открыть</MyButton>
          <MyButton onClick={() => props.remove(props.post)}n>Удалить</MyButton>
        </div>
      </div>
    </div>
  );
};

export default PostItem;