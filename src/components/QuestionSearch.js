import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SearchButton from './SearchButton';

const QuestionSearch = () => {
  const { questionId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:3001/questions/${questionId}`);

        const questionData = await response.json();
        /*setQuestions(questionData);*/
        setFilteredQuestions(questionData);

        console.log(questionData)
        setLoading(false);

      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [questionId]);


  if (loading) {
    return (
      <h1>Loading...</h1>
    );
  }

  const handleSearch = (searchTerm) => {
    const filtered = questions.filter((question) =>
      question.questionText.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredQuestions(filtered);
  };

  return (
    <div>
      <p>Please search for a question to get started.</p>
      <SearchButton onSearch={handleSearch} />

      <ul>
        {filteredQuestions.map((question) => (
          <li key={question.questionId}>{question.questionText}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionSearch;