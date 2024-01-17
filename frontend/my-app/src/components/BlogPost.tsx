import { useState, useEffect } from "react";
import axios from "axios";
import { Route, useParams } from "react-router-dom";
import  Markdown  from "react-markdown";
const API = "https://dfvoxbjo2c.execute-api.us-east-1.amazonaws.com/Prod/"

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
      .get(`${API}${id}`, {headers: {
    'x-api-key': apiKey,
    'Content-Type': 'application/json'
  }})
      .then((response) => {
        setPost(response.data[0]);
      });
  }, [id]);

  console.log(post);
  if (!post) {
    return <div><p>Loading...</p></div>;
  }

  return (
  <section>
    <div className="individual-blog-post">
      <div className="page-header">
          <h1>{post.title}</h1>
     </div>
      <img className="img-thumbnail center-header-img mx-auto d-block" src={post.thumbnail}/>
                    <p className="text-body-secondary">
      <small>By {post.author}</small></p>
      <Markdown>{post.content}</Markdown>
    </div>
    </section>
  );
};
export default BlogPost
