import { useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from  '../../hooks/httpHook';

const NewTask = (props) => {
/*   const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); */
  const [loading,error,data,sendRequest] = useHttp();

  const enterTaskHandler = async (taskText) => {
   /*  setIsLoading(true);
    setError(null); */
    
    sendRequest( 'https://react-http-asd-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
    'POST',
    JSON.stringify({ text: taskText }) 
     )

     const generatedId = data.name; // firebase-specific => "name" contains generated id
     const createdTask = { id: generatedId, text: taskText };

     props.onAddTask(createdTask);
    
    
    try {
      const response = await fetch(
        'https://react-http-asd-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
        {
          method: 'POST',
          body: JSON.stringify({ text: taskText }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
