import { useEffect, useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from  '../../hooks/httpHook';

const NewTask = (props) => {
/*   const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); */
  const [text,setText] =useState('');
  const {loading,error,data,sendRequest} = useHttp();

  const{onAddTask} =props;
  

  useEffect(() => {
     
   ;debugger
    if(text && data && !error && !loading )
    {

     const generatedId = data.name; // firebase-specific => "name" contains generated id
     const createdTask = { id: generatedId, text:text };
     onAddTask(createdTask);
    }

  }, [data,error,loading,sendRequest,text,onAddTask])

  const enterTaskHandler =  (taskText) => {  

    setText(taskText);
    
    sendRequest( 'https://react-http-asd-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
    'POST',
    JSON.stringify({ text: taskText }) 
     );
 
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={loading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
