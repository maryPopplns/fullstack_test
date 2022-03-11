import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  useEffect(() => {
    const cookies = document.cookie.split(';').reduce((cookies, cookie) => {
      const [name, val] = cookie.split('=').map((c) => c.trim());
      cookies[name] = val;
      return cookies;
    }, {});
    const { knightBlogToken } = cookies;
    console.log(knightBlogToken);
  }, []);

  return (
    <div className='App'>
      <Link to='/'>home link</Link>
      <Link to='/login'>login route</Link>
      <a href='http://localhost:3001/login/google'>google login</a>
      <Outlet />
    </div>
  );
}

export default App;
