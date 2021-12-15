import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`/feedback?_sort=id_order=desc`).then((res) => {
      setFeedback(res.data);
      setIsLoading(false);
    });
  }, []);
  /* using fetch
  const fetchFeedback = async () => {
    const response = await fetch(
      `http://localhost:3001/feedback?_sort=id_order=desc`
    );
    const data = await response.json;
    setFeedback(data)
  };
*/
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  // set items to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to remove item?')) {
      axios.delete(`/feedback/${id}`);
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const addFeedback = (newFeedback) => {
    axios.post(`/feedback`, newFeedback).then((res) => {
      setFeedback(feedback.concat(res.data));
    });
  };

  const updateFeedback = (id, updatedItem) => {
    axios.put(`/feedback/${id}`, updatedItem).then((changedItem) => {
      setFeedback(
        feedback.map((item) => (item.id !== id ? item : changedItem.data))
      );
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
