import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Nav from './component/nav.jsx'
import Confirm from './component/confirm.jsx'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { use } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <p className="mb-4 text-lg">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded hover:bg-green-700"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2  cursor-pointer bg-red-600 text-white rounded hover:bg-red-700"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [todo, settodo] = useState("")
  const [todoList, settodoList] = useState((() => {
    let saved = localStorage.getItem("Todos");
    return saved ? JSON.parse(saved) : [];
  }))

  const [showDialog, setShowDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showdone, setshowdone] = useState(false)
  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    let t = localStorage.getItem("Todos")
    if (t) {
      let todoList = JSON.parse(localStorage.getItem("Todos"))
      settodoList(todoList)
    }
  }, [])
  const handlechange = (e) => {

    settodo(e.target.value)

  }
  const handleEdit = (e, id) => {
    let index = todoList.findIndex(item => {
      return item.id === id
    })
    settodo(todoList[index].todo)
    let t = todoList.filter(item => {
      return item.id != id
    })
    settodoList(t)

  }
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDialog(true);
  };

  // Step 2: Confirm delete
  const handleConfirmDelete = () => {
    let t = todoList.filter((item) => item.id !== deleteId);
    settodoList(t);
    setShowDialog(false);
    setDeleteId(null);
  };

  // Step 3: Cancel delete
  const handleCancelDelete = () => {
    setShowDialog(false);
    setDeleteId(null);
  };
  const handleAdd = () => {
    settodoList([...todoList, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
  }
  const handlecheck = (e) => {
    let id = e.target.name;
    let newtodos = [...todoList]
    let index = newtodos.findIndex(item => {
      return item.id === id
    })
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    settodoList(newtodos)

  }
  const handletoggle = (params) => {
    setshowdone(!showdone)
  }

  return (
    <>
      <Nav />
      <div className="container m-auto bg-violet-200  min-h-[80vh] my-10 rounded-2xl">
        <div className="wrap mx-10 min-h-[80vh]"> 
          <h1 className='font-bold text-center text-2xl my-5  text-cyan-700'>ITask Manger TodoList</h1>
          <h2 className='text-xl font-bold p-2'>Add to ToDo</h2>
          <div className="addtodo md:flex justify-between ">
            <input onChange={handlechange} value={todo} className='text-lg px-2  border-2 md:w-[88%]  placeholder:pl-3  w-full' type="text" placeholder="Write your todo's" />
            <button onClick={handleAdd} disabled={todo.length < 3} className='w-full md:w-[12%]  border-2 cursor-pointer rounded-md disabled:bg-violet-800 bg-violet-800 text-white hover:bg-violet-950 px-3 my-2 md:my-0'>Add to ToDoList</button>
          </div>
          <div className='flex gap-3'>
            <input onChange={handletoggle} type="checkbox" checked={showdone} id="" />
            <div className='font-medium text-lg'>Show Unfinished</div>
          </div>
          <h2 className='text-xl font-bold p-2'>Your Todo's</h2>
          {todoList.length == 0 && <div className='m-5 text-2xl font-semibold'>No Todo To Display</div>}
          {todoList.map(item => {
            return (!showdone || !item.isCompleted) && <div key={item.id} className="todoList md:w-1/2  w-full flex justify-between ">
              <div className="todo w-full m-3 flex gap-10">
                <input onChange={handlecheck} type="checkbox" name={item.id} checked={item.isCompleted} id="" />
                <div className={`${item.isCompleted ? 'line-through' : ''} text-lg font-medium`}>{item.todo}</div>
              </div>
              <div className="buttons m-3 flex">
                <button onClick={(e) => handleEdit(e, item.id)} name={item.id} className='cursor-pointer border-2 px-2 mx-2 bg-violet-700 text-white rounded-md hover:bg-violet-900'><FaEdit /></button>
                <button onClick={() => handleDeleteClick(item.id)} name={item.id} className='cursor-pointer px-2 mx-2 bg-violet-700 text-white rounded-md hover:bg-violet-900'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
      {showDialog && (
        <ConfirmDialog
          message="Are you sure you want to delete this todo?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  )
}

export default App
