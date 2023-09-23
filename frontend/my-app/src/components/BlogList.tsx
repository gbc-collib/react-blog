import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios"

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
    axios.get("http://localhost:5000/posts").then((response) => {
        console.log(response.data);
      setPosts(response.data);
    });
  }, []);
 return (
    <div className="blog-grid">
      {posts.map((post) => (
        <div key={post.id} className="blog-post">
          <h2><Link to={`/post/${post.id}`}>{post.title}</Link></h2>
          <img className="img-thumbnail" src={post.thumbnail} alt={post.title} />

                    <p>
                    By <span>{post.author}</span> on <span>{formatDate(post.published)}</span>
                    </p>
          <Link to={`/post/${post.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;



