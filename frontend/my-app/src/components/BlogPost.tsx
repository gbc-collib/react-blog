import { useState, useEffect } from "react";
import axios from "axios";
import { Route, useParams } from "react-router-dom";

type Post ={
  id: number;
  author: string;
  date: Date;
  title: string;
  content: string;
  thumbnail: string;
}


const BlogPost: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/post/${id}`)
      .then((response) => {
        setPost(response.data);
      });
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="center-block indiviual-blog-post">
      <div className="page-header">
          <h1>{post.title}</h1>
     </div>
      <p><small>By {post.author}</small></p>
      <section><img className="img-thumbnail" src={post.thumbnail}></img></section>
      <p>{post.content}</p>
    </div>
  );
};
export default BlogPost
