import {Link, useLocation} from "react-router-dom";
import {useEffect, useState } from "react"
const Navbar = (): React.ReactElement => {
    const location = useLocation(); // once ready it returns the 'window.location' object
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);
  return (
    <nav>
      <ul className="navbar-inverted navbar-dark nav nav-pills nav-justified">
        <li><Link to="/" className={"nav-link" + (url === "/" ?" active" : "")}>Home</Link></li>
        <li><Link to="/blog/" className={"nav-link"+ (url === "/blog/" ? " active" : "")}>Blog</Link></li>
        <li><Link to="/contact/" className={"nav-link" + (url === "/contact/" ? " active" : "")}>Contact</Link></li>
        <li><Link to="/about/" className={"nav-link" + (url === "/about/" ? " active" : "")}>About</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

