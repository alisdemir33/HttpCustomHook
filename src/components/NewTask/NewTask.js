import { useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/useHttp';

const NewTask = (props) => {

  const {isLoading,error,sendRequest} =useHttp();

  const createTask = (taskText,taskData) =>{
    const generatedId =taskData.id;
    const cretaedTask = {id:generatedId, text:taskText}
    props.onAddTask( cretaedTask);
  }

  const enterTaskHandler = async (taskText) => {
   
    sendRequest(
    {
     url: 'https://react-http-asd-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
      method: 'POST',    
      headers: {
        'Content-Type': 'application/json',
      },      
      body: { text: taskText },
    }, createTask.bind(null,taskText) );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
