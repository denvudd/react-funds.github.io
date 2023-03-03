import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../../hooks/useFetching";

import Loader from "../../components/UI/loader/Loader";

import PostService from "../../API/PostService";

import './postPage.css';

const PostPage = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [avatar, setAvatar] = useState({});
  const params = useParams();
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });
  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id);
    setComments(response.data);
  });
  const [fetchAvatar, isAvatarLoading, avatarError] = useFetching(async (id) => {
    const response = await PostService.getAvatarByPostId(id);
    setAvatar(response.data);
  });
  
  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
    fetchAvatar(params.id);
  }, []);

  return (
    <div className="post-page">
      <div className="container">
        <div className="posts__title">Пост №{params.id}</div>
        {isLoading 
            ? <Loader/>
            : <div className="post-page__body">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, voluptate officia nulla, aliquid 
                  accusamus odit, nostrum dolores beatae excepturi eos in. Ullam ducimus quae ipsa vel suscipit enim expedita 
                  nisi voluptas fugiat, porro alias. Repellat ducimus in facilis, voluptatem ea perspiciatis, magni voluptate 
                  rerum, nostrum ratione autem libero numquam accusantium error quidem harum. Dolorum nemo expedita eaque iusto 
                  corrupti aspernatur fugiat! Similique non ullam laboriosam optio error nisi! Suscipit et facere eum laborum quisquam 
                  dolorem error quod laboriosam reprehenderit veritatis velit saepe delectus culpa, id voluptatem necessitatibus in quos 
                  ab consequuntur temporibus nam animi adipisci enim. Eum, mollitia minima. Eaque?</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere maxime enim velit accusantium. Consequatur sapiente 
                  fuga ipsam optio aperiam ipsa, exercitationem placeat! Odit ratione fugiat doloremque nostrum quo accusantium vitae earum 
                  veniam, non molestiae. Qui quod architecto recusandae magni maxime, nihil, consequatur, praesentium omnis voluptates delectus 
                  cum quis vitae non?</p>
                <p>{post.id}. {post.title}</p>
              </div>
        }
        {isComLoading
          ? <Loader/>
          : <div className="comments">
            <div className="comments__title">Комментарии: </div>
            <div className="comments__wrapper">
              {comments.map(comm =>
                <div className="comment-item" key={comm.id}>
                  <div className="comment-item__header">
                    <div className="comment-item__avatar">
                      {isAvatarLoading ? <Loader/> : <img src={
                        avatar[comm.id] ? avatar[comm.id - 1].url : 'https://via.placeholder.com/150/771796'
                      } alt="" />}
                    </div>
                    <div className="comment-item__info">
                      <div className="comment-item__name"><span className="comment-item__label">Name:</span> {comm.name}</div>
                      <div className="comment-item__email"><span className="comment-item__label">Email:</span> {comm.email}</div>
                    </div>
                  </div>
                  <div className="comment-item__body">{comm.body}</div>
                </div>
              )}
            </div>
          </div>
        }
        </div>
    </div>
  );
};

export default PostPage;