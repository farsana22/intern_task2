import { useEffect, useState } from 'react';
import nothingImg from './assets/nodata.png'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface todoType {
  id: number;
  title: string;
  date: string;
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
      console.log(res.data);
      setTodos(res.data);
    }).catch((err) => {
      console.log(err);
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
      console.log(res.data);
      toast.success("Todo added!");
      const newTodo = res.data;
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }).catch((err) => {
      console.log(err);
      toast.error("Something went wrong!")
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
    console.log(todo)
  }

  //update a todo status
  const updateTodo = (id: number) => {
    axios.put(BASE_URL + `todo/${id}/`, {}, {
      headers: {
        Authorization: "Bearer " + Token,
        'content-type': 'multipart/form-data',
      }
    }).then((res) => {
      console.log(res)
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? res.data : todo
        )
      );
      console.log(todos)
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
      console.log(res)
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }).catch((err) => {
      console.log(err);
    })
    countCompletedTodos();
  };

  //get todo count
  const countAllTodos = () => todos.length;

  //get completed todo count 
  const countCompletedTodos = () => todos.filter((todo: any) => todo.isCompleted).length;

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
          <span className="material-symbols-outlined send" onClick={AddATodo} >
            send
          </span>
        </div>
        <div className="todoDisplayBox">
          {todos.length !== 0 ?
            <div >
              <div className="info">
                <div className="infoWrapper">
                  <span className="infoItem">Created Tasks: </span><div className="createdList">{countAllTodos()}</div>
                </div>
                <div className="infoWrapper">
                  <span className="infoItem">Completed Tasks:</span><div className="createdList">{countCompletedTodos()}/{countAllTodos()}</div>
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
                  todos && todos.map((task) => (

                    <div className="todoItem" key={task?.id}>
                      <div className="todoItemWrapper">
                        <div className="checkbox">
                          {task?.isCompleted
                            ?
                            <span onClick={(e: any) => {
                              console.log("first")
                              e.preventDefault();
                              updateTodo(task?.id)
                            }} className="material-symbols-outlined check">
                              check_circle
                            </span>
                            :
                            <span onClick={(e: any) => {
                              console.log("first")
                              e.preventDefault();
                              updateTodo(task?.id)
                            }} className="material-symbols-outlined check">
                              radio_button_unchecked
                            </span>
                          }
                        </div>
                        <div className="todoDetails">
                          <span className="todoTitle">{task.title}</span>
                          <span className="todoTime">{task.date}</span>
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
        <span className="author">Made with <span className="emoji">❤️</span> by Farsana</span>
      </div>
    </div>
  )
}
