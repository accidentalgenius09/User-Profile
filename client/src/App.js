import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

/* importing all components */
import Username from './components/Username';
import Reset from './components/Reset';
import Register from './components/Register';
import Recovery from './components/Recovery';
import Profile from './components/Profile';
import Password from './components/Password';
import PageNotFound from './components/PageNotFound';



function App() {
  return (
    <BrowserRouter>

    <Routes>

      <Route path='/' element={<Username/>}/>
      <Route path='/reset' element={<Reset/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/recovery' element={<Recovery/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/password' element={<Password/>}/>
      <Route path='*' element={<PageNotFound/>}/>

    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
