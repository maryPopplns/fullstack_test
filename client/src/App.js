import { Link, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Link to='/'>home link</Link>
      <Link to='/login'>login link</Link>
      <Outlet />
    </div>
  );
}

export default App;
