import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const QuestionSearch = () => {
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');

  const fetchSubjects = async () => {
    try {
      const response = await fetch('http://localhost:3001/subjects');
      const subjectsData = await response.json();
      setSubjects(subjectsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`http://localhost:3001/questions/${selectedSubject}`);
      const questionsData = await response.json();
      setFilteredQuestions(questionsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      fetchQuestions();
    }
  }, [selectedSubject]);


  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <p>Please select a subject to get started.</p>

      <select onChange={(e) => setSelectedSubject(e.target.value)}>
        <option value="">Select Subject</option>

        {Array.isArray(subjects) &&
          subjects.map((subject) => (
            <option key={`subject-${subject.questionSubject}`} value={subject.questionSubject}>
              {subject.questionSubject}
            </option>
          ))}
      </select>

      {filteredQuestions.length > 0 ? (
        <div>
          <p>Here are all the questions for the selected subject:</p>
          {filteredQuestions.map((question) => (
            <div key={question.questionId} style={{ marginBottom: '10px' }}>
              <p>Q: {question.questionText}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No questions found for the selected subject.</p>
      )}

    </div>
  );
};

export default QuestionSearch;