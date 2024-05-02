import { useEffect, useState } from "react";
import {FaTrash,FaEdit} from 'react-icons/fa'
import MODAL from "./Modal";
import axios from "axios";
const App = () => {


  const [text,setText] = useState('')


  //this is for add button name realted to action that is going to be carried out
  const [Name,seTname] = useState('Add')
 //this is for holding id that will be used for updating that match the edit button id clicked
  const [todoId, setTodoId] = useState('');
  //this is used for showing and hiding modal
  const [show,setShow] = useState(false);
  //this handle input values
  const [name, setName] = useState('');
  //this function is used for hiding modal
  const handleClose = () => setShow(false);
  //this showing modal when add button clicked
  const handleShow = () =>{
    setShow(true);
    seTname('Add')//this set the name of the function button on to modal to be  add button
    setText('add Your new todo')
  } 
 
//this handle the input field
  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  //this hold data of todos from the database
const [data,setData] = useState([])

useEffect(()=>{
 axios.get('http://localhost:5000/api/todos').then(res=>{
  setData(res.data)
 }).catch((error)=>{
  console.log('elrror token',error);
 })
},[])

//this is for deleting completed todo
const handleDelete =(id)=>{
  axios.delete(`http://localhost:5000/api/todos/${id}`).then(res=>{
    window.location.reload()
  }).catch((error)=>{
    console.log('error',error);
  })
}

//this is for add new todo
const handleSubmit = () => {
 axios.post('http://localhost:5000/api/todos',{name}).then(res=>{
  window.location.reload()
 }).catch((error)=>{
  console.log('error',error);
 })
  handleClose(); // Close the modal after submission
};

//this bring about modal for updating for matching id
const handleUpdate = (id) => {
  setShow(true);
  seTname('Update')
  setTodoId(id);
  setText('update your todo')
};

//this is for udating databse when update button clicked
const UpdateDb = (id)=>{
  axios.put(`http://localhost:5000/api/todos/${id}`,{name}).then(res=>{
  }).catch((error)=>{
    console.log('error',error);
  })
  handleClose()
  window.location.reload()
}
//this is intervene both add and update
const handleAll =()=>{
  if(Name === 'Add'){
    handleSubmit()
  }
  else{
    UpdateDb(todoId)
  }
}

  return (
    <div className="container-fluid">
      <div className="w-50 mx-auto">
         <div className="d-flex justify-content-between py-1 px-2 mt-5 mb-3 bg-dark rounded">
          <h1 className="h3 text-light">Todo</h1>
          <h1 className="h3 text-light">Action</h1>
         </div>
          <div>
            {data.map((todo)=><div key={todo._id} className="d-flex justify-content-between align-items-center">
              <p>{todo.name}</p>
                <div className="d-flex">
                <FaTrash  className="text-danger cursor-pointer mx-3" onClick={()=>handleDelete(todo._id)}/>
                <FaEdit className="text-info cursor-pointer" onClick={()=>handleUpdate(todo._id)}/>
               
                </div>
    
            </div>)}
          </div>

        <div className="d-flex justify-content-center">
        <MODAL show={show} handleClose={handleClose}  handleSubmit={handleAll} handleShow={handleShow}
        handleInputChange={handleInputChange} name={Name} text={text}/>
        </div>

    </div>
    </div>
  )
};

export default App;
