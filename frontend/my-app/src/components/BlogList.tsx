import {useState, useEffect} from "react";
import "../style/bloglist.scss";
import {Link} from "react-router-dom";
import axios from "axios"
const API = "https://dfvoxbjo2c.execute-api.us-east-1.amazonaws.com/Prod/"

interface Post {
  id: number;
  author: string;
  published: string;
  title: string;
  content: string;
  //thumbnail represents the path to the tumbnail image
  thumbnail?: string
}
const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
   let formattedDate:Date = new Date(date);
    return formattedDate.toLocaleDateString(undefined, options);
  };

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get(`${API}`, {"headers":{'x-api-key':apiKey, "Content-Type":"application/json"}})
    .then((response) => {
      setPosts(response.data);
    });
  }, []);
  if(!posts){
    return <div><p>Loading...</p></div>;
  }
    return (
    <div className="blog-grid">
      {posts.map((post) => (
        <div className="terminal-card" key={post.id}>
          <div className="terminal-header">
            <span>$ Blog Post</span>
          </div>
          <div className="terminal-content">
            <h2><Link className="terminal-link" to={`/blog/${post.id}`}>{post.title}</Link></h2>
            <img className="img-thumbnail" src={post.thumbnail} alt={post.title} />
            <p>
              By <span>{post.author}</span> on <span>{formatDate(post.published)}</span>
            </p>
            <Link className="terminal-link" to={`/blog/${post.id}`}>Read more</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;



