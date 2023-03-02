import { TransitionGroup, CSSTransition } from "react-transition-group";
import PostItem from "./PostItem";

const PostList = ({posts, title, remove, page, totalPages, limit, mode}) => {
  if (!posts.length) {
    return (
      <div className="no-post">Посты не найдены</div>
    )
  };

  return (
    <div className="posts">
      <div className="posts__title">{title}</div>
      {limit == -1 || mode === 'lazyscroll'
            ? null
            : <div className="posts-page__num">Страница {page} из {totalPages}</div>
      }
      
      <TransitionGroup>
      {posts.map((post, index) => (
        <CSSTransition key={post.id}
                       timeout={500}
                       classNames="post"
        >
          <PostItem remove={remove} number={index} post={post}/>
        </CSSTransition>
      ))}
      </TransitionGroup>
    </div>
  );
};

export default PostList;