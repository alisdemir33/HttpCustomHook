import React, { useState, useEffect, useReducer ,useCallback} from 'react';

const initialState = {
    loading: false,
    error: null,
    data: null
}

const httpReducer = (state, action) => {
    ;debugger
    if (action.type === 'SEND') {
        return {...state, loading: true, error: null }

    } else if (action.type === 'RESPONSE') {
       
        return { ...state, loading: false, data: action.payload, error: null }
    }
    else if (action.type === 'ERROR') {
        return {...state, loading: false, data: null, error: action.payload }
    } else {
        return initialState;
    }
}

const useHttp = () => {

    const [state, dispatchHttpAction] = useReducer(httpReducer,initialState);

    const  sendRequest =  useCallback( async  (url,requestType, requestBody ) =>  {
        ;debugger
        dispatchHttpAction({type: 'SEND', payload: null});
        ;debugger
        try {
            const response = await fetch(
                // 'https://react-http-asd-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'
                url,
                {
                    method: requestType,
                    body: requestBody,
                    headers: { 'content-type': 'application-json' }
                }
            );
            ; debugger
            if (!response.ok) {
                //throw new Error('Request failed!');
                dispatchHttpAction({  type: 'ERROR', payload: null  });
            }

            const data = await response.json();
            if (data === null) {
                dispatchHttpAction({  type: 'ERROR', payload: null  });
                // throw new Error('Request failed!');
            }

            dispatchHttpAction({  type: 'RESPONSE', payload: data  })
            /* 
                  const loadedTasks = [];
            
                  for (const taskKey in data) {
                    loadedTasks.push({ id: taskKey, text: data[taskKey].text });
                  } */

            // setTasks(loadedTasks);
        } catch (err) {
            ; debugger

            // setError(err.message || 'Something went wrong!');
            dispatchHttpAction({ type: 'ERROR', payload: err.message  });
        }
        // setIsLoading(false);

    }, []);


    return {
        loading:state.loading,
        error:state.error,
        sendRequest:sendRequest,
       data: state.data,      
    }
}
export default useHttp;