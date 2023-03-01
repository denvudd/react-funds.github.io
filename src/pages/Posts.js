import { useState, useEffect } from "react";
import { usePosts } from "../hooks/usePost";
import { useFetching } from "../hooks/useFetching";

import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";

import MyModal from "../components/UI/modal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";

import PostService from "../API/PostService";

import { getPageCount } from "../utils/pages";


function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);

    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit))
  });

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const changePage = (page) => {
    setPage(page);
  } 

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  // Get post from child component
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  };

  return (
    <div className="posts-page">
      <div className="create-btn">
        <MyButton style={{marginTop: '30px', textAlign: 'center'}} 
                  onClick={() => setModal(true)}
        >
          Создать пользователя
        </MyButton>
      </div>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter}/>
      {postError &&
        <div className="no-post">Произошла ошибка "{postError}"</div>}
      {isPostsLoading 
        ? <div className='loader__wrapper'><Loader/></div>
        : <PostList remove={removePost} 
                    posts={sortedAndSearchedPosts} 
                    title="Посты про JS"
                    page={page}
                    totalPages={totalPages}
          />}  
      <Pagination page={page} 
                  changePage={changePage} 
                  totalPages={totalPages} 
      />

    </div>
  );
}

export default Posts;
