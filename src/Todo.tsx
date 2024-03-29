import { useEffect, useState } from 'react';
import nothingImg from './assets/nodata.png'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

interface todoType {
  id: number;
  title: string;
  created: string;
  isCompleted: boolean;
}

export const Todo = () => {

  const [todos, setTodos] = useState<todoType[]>([]);
  const [todo, setTodo] = useState<string>("");
  const navigate = useNavigate();
  const BASE_URL = "https://www.mulearn.org/api/v1/mulearn-task/"
  const Token = localStorage.getItem('accessToken');

  //get todo
  const getAllTodos = async () => {
    await axios.get(BASE_URL + 'todo/', {
      headers: {
        Authorization: "Bearer " + Token
      }
    }).then((res) => {
      setTodos(res.data);
    }).catch((err) => {
      if (err.response.status) {
        localStorage.clear();
        navigate('/login')
      }
    })
  };

  //add todo
  const AddATodo = () => {
    axios.post(BASE_URL + 'todo/', {
      title: todo
    }, {
      headers: {
        Authorization: "Bearer " + Token,
        'content-type': 'multipart/form-data',
      }
    }).then((res) => {
      toast.success("Todo added!");
      const newTodo = res.data;
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }).catch((err) => {
      if (err) {
        toast.error("Something went wrong!")
      }
    })
  }


  //get all todos useffect
  useEffect(() => {
    if (Token) {
      getAllTodos();
    } else {
      navigate('/login')
    }
  }, [])

  function handleChange(e: any) {
    setTodo(e.target.value)
  }

  //update a todo status
  const updateTodo = (id: number) => {
    axios.put(BASE_URL + `todo/${id}/`, {}, {
      headers: {
        Authorization: "Bearer " + Token,
        'content-type': 'multipart/form-data',
      }
    }).then((res) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? res.data : todo
        )
      );
    })
  };


  //delete a todo status
  const deleteTodo = (id: any) => {
    axios.delete(BASE_URL + `todo/${id}/`, {
      headers: {
        Authorization: "Bearer " + Token,
        'content-type': 'multipart/form-data',
      }
    }).then((res) => {
      if (res) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      }
    }).catch((err) => {
      if (err) {
        toast.error("Something went wrong!")
      }
    })
    countCompletedTodos();
  };

  //get todo count
  const countAllTodos = () => todos.length;

  //get completed todo count 
  const countCompletedTodos = () => todos.filter((todo: any) => todo.isCompleted).length;

  const formattedTodos = todos.map((todo) => ({
    id: todo.id,
    title: todo.title,
    isCompleted: todo?.isCompleted,
    created: format(new Date(todo.created), 'MM/dd/yyyy'),
    createdTime: format(new Date(todo?.created), 'HH:mm:ss') // Convert timestamp to a formatted date
  }));

  return (
    <div className="App">
      <div className="container">
      </div>
      <div className="todowrapper">
        <div className="titleBox">
          <span className="title">Todo</span>
          <button className='logout' onClick={(e) => {
            e.preventDefault();
            localStorage.clear();
            toast.success("Logout Successful")
            setTimeout(() => {
              navigate('/login')
            }, 900);
          }}>Logout</button>
        </div>
        <div className="inputBox">
          <input type="text" className='todoinput' onChange={(e: any) => handleChange(e)} value={todo} placeholder='Add a new task' />
          <span className="material-symbols-outlined send" onClick={(e) => {
            e.preventDefault();
            if (todo !== "") {
              AddATodo();
            } else {
              toast.error("Please enter something!")
            }
          }} >
            send
          </span>
        </div>
        <div className="todoDisplayBox">
          {todos.length !== 0 ?
            <div >
              <div className="info">
                <div className="infoWrapper">
                  <span className="infoItem">Created Tasks: </span><div className="createdList"><span className="count">{countAllTodos()}</span></div>
                </div>
                <div className="infoWrapper">
                  <span className="infoItem">Completed Tasks:</span><div className="createdList"><span className="count">{countCompletedTodos()}/{countAllTodos()}</span></div>
                </div>
              </div>
              <hr />
            </div>
            : <></>
          }

          {
            todos.length === 0 ?

              <div className="noDataCol">

                <img src={nothingImg} alt="hey" className='noData' />
                <span className="dataMsg">You haven't added any todos!</span>
              </div>

              :

              <div className="todoItemCol">

                {
                  todos && formattedTodos.map((task) => (

                    <div className="todoItem" key={task?.id}>
                      <div className="todoItemWrapper">
                        <div className="checkbox">
                          {task?.isCompleted
                            ?
                            <span onClick={(e: any) => {
                              e.preventDefault();
                              updateTodo(task?.id)
                            }} className="material-symbols-outlined check">
                              check_circle
                            </span>
                            :
                            <span onClick={(e: any) => {
                              e.preventDefault();
                              updateTodo(task?.id)
                            }} className="material-symbols-outlined check">
                              radio_button_unchecked
                            </span>
                          }
                        </div>
                        <div className="todoDetails">
                          <span className="todoTitle">{task.title}</span>
                          <div className="timeBox">
                            <span className="todoTime">{task.created}</span>
                            <span className="todoTime">{task.createdTime}</span>
                          </div>
                        </div>
                        <div className="action">
                          <span className="material-symbols-outlined check" onClick={(e: any) => {
                            e.preventDefault()
                            deleteTodo(task?.id)
                          }}>
                            delete
                          </span>
                        </div>
                      </div>
                    </div>

                  ))
                }
              </div>
          }
        </div>
      </div>
      <div className="love">
        <span className="author">Made with <span className="emoji">💚</span> by <a href="https://www.linkedin.com/in/farsana-n-485889293/" className="link"> Farsana</a></span>
      </div>
    </div>
  )
}
