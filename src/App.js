import { useState, useMemo } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import './styles/App.css';
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'Javascript', body: 'Description'},
    {id: 2, title: 'OOP', body: 'Description OOP '},
    {id: 3, title: 'Methods', body: 'Description Methods'},
    {id: 4, title: 'Loops', body: 'Description Loops'},
    {id: 5, title: 'Javascript', body: 'Description'},
  ]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  // Get post from child component
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  };

  const sortedPosts = useMemo(() => {
    console.log(filter.sort);
    if (filter.sort) {
      console.log([...posts.sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))])
      return [...posts.sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))];
    } else {
      return posts;
    }
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()));
  }, [filter.query, sortedPosts]);

  return (
    <div className="App">
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
      <PostList remove={removePost} 
                posts={sortedAndSearchedPosts} 
                title="Посты про JS"
        />    
    </div>
  );
}

export default App;
