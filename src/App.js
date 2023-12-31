import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import FrontPage from './FrontPage';
import QuestionSearch from './components/QuestionSearch';

function App() {
  return (
    <BrowserRouter>
    <Link to={'/'} >Home</Link>
    <Routes>
      <Route path='/' element={ <FrontPage/> } />
      <Route path="/questions/:questionId?" component={QuestionSearch} />
      <Route path='*' element={ <h2>Page not found</h2> } />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
