import PostItem from "./PostItem";

const PostList = ({posts, title, remove}) => {
  if (!posts.length) {
    return (
      <div className="no-post">Посты не найдены</div>
    )
  };

  return (
    <div className="posts">
      <h1 className="posts__title">{title}</h1>
      {posts.map((post, index) => (
        <PostItem remove={remove} number={index} post={post} key={post.id}/>
      ))}
    </div>
  );
};

export default PostList;