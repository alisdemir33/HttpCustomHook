import React, { useEffect, useState,useCallback } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/httpHook'

// cust branc..
function App() {

  const [tasks, setTasks] = useState([]);

  const {loading,error,sendRequest,data} = useHttp(); 

 
  useEffect(() => { 
   fetchTasksHandler();
  }, []);

  useEffect ( () =>{
    ;debugger
    if(!error && !loading && data ){
      const loadedTasks = [];
  
      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }
  
      setTasks(loadedTasks);
    }else{
      ;debugger
        //handle error
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
