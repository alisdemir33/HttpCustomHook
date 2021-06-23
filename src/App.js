import React, { useEffect, useState,useCallback } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/httpHook'

// cust branc..
function App() {
/*   const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); */
  const [tasks, setTasks] = useState([]);

  const {loading,error,sendRequest,data} = useHttp(); 

  /* const fetchTasks = async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://react-http-asd-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'
      );
;debugger
      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      if(data === null)
        throw new Error('Request failed!');

      const loadedTasks = [];

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      setTasks(loadedTasks);
    } catch (err) {
      ;debugger
    
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };
 */
  useEffect(() => {
   // fetchTasks();
   fetchTasksHandler();
  }, []);

  useEffect ( () =>{
    if(!error && !loading && data ){
      const loadedTasks = [];
  
      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }
  
      setTasks(loadedTasks);
    }
  },[data,loading,error])

  const taskAddHandler = useCallback(
   (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
   },
   []);
 
/*  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  }; */

  const fetchTasksHandler = () => {
    ;debugger
    sendRequest('https://react-http-asd-default-rtdb.europe-west1.firebasedatabase.app/tasks.json','GET')

    ;debugger
    
  }

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={loading}
        error={error}
        onFetch={fetchTasksHandler}
      />
    </React.Fragment>
  );
}

export default App;
