import './FrontPage.css';
import QuestionSearch from "./components/QuestionSearch";

function FrontPage() {
    return (
        <div className='FrontPage'>
            <h1>Quiz Time</h1>
            <QuestionSearch />
        </div>
    );
  }
  
  export default FrontPage;
  