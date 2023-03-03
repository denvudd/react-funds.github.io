import { useState, useEffect, useRef } from "react";
import { usePosts } from "../../hooks/usePost";
import { useFetching } from "../../hooks/useFetching";
import { useObserver } from "../../hooks/useObserver";

import PostList from "../../components/PostList/PostList";
import PostForm from "../../components/PostForm/PostForm";
import PostFilter from "../../components/PostFilter/PostFilter";
import PostSearch from "../../components/PostSearch/PostSearch";

import MyModal from "../../components/UI/modal/MyModal";
import MyButton from "../../components/UI/button/MyButton";
import MySelect from "../../components/UI/select/MySelect";
import Loader from "../../components/UI/loader/Loader";
import Pagination from "../../components/UI/pagination/Pagination";

import PostService from "../../API/PostService";

import { getPageCount } from "../../utils/pagesCount";

import './posts.css';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState('pagination');
  const lastElement = useRef();

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    
    if (mode === 'pagination') {
      setPosts(response.data);
    } 
    if (mode === 'lazyscroll') {
      setPosts([...posts, ...response.data]);
    }

    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit))
  });
  
  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    if (mode === 'lazyscroll') { 
      setTimeout(() => {
        setPage(page + 1);
      }, 200)
    }
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit, mode]);

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
      <div className="container">
        <MyModal visible={modal} setVisible={setModal}>
          <PostForm create={createPost}/>
        </MyModal>
        <PostSearch filter={filter} setFilter={setFilter}/>
        <div className="content-modes">
          <PostFilter filter={filter} setFilter={setFilter}/>
          <MySelect
                  value={limit}
                  onChange={value => setLimit(value)}
                  defaultValue="Кол-во элементов на странице"
                  options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Показать все'},
                  ]}
          />
          <MySelect 
                  value={mode}
                  onChange={value => setMode(value)}
                  defaultValue="Тип отображения"
                  options={[
                    {value: "pagination", name: 'Постранично'},
                    {value: "lazyscroll", name: 'Бесконечная прокрутка'},
                  ]}
          />
        </div>
        <div className="create-btn">
          <MyButton style={{marginTop: '30px', textAlign: 'center'}} 
                    onClick={() => setModal(true)}
          >
            Создать пользователя
          </MyButton>
        </div>
        {postError &&
          <div className="no-post">Произошла ошибка "{postError}"</div>}
        <PostList
                remove={removePost} 
                posts={sortedAndSearchedPosts} 
                title="Посты про JS"
                page={page}
                totalPages={totalPages}
                limit={limit}
                mode={mode}
        />
        <div ref={lastElement} class="observer"></div>
        {isPostsLoading && 
          <div className='loader__wrapper'><Loader/></div>}  
          <Pagination page={page} 
                      changePage={changePage} 
                      totalPages={totalPages} 
        />
      </div>
    </div>
  );
}

export default Posts;
