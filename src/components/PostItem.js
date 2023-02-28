import MyButton from "./UI/button/MyButton";


const PostItem = (props) => {
  

  return (
    <div>
      <div className="post">
        <div className="post__content">
          <div className="post__name">{props.number}. {props.post.title}</div>
          <div className="post__body">
            {props.post.body}
          </div>
        </div>
        <div className="post__btns">
          <MyButton onClick={() => props.remove(props.post)}n>Удалить</MyButton>
        </div>
      </div>
    </div>
  );
};

export default PostItem;