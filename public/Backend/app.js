const Todo = require('./model')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 5000
const mongoose = require('mongoose')
const app = express()

app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:3000'
}))

//connection
mongoose.connect('mongodb://localhost:27017/TODO').then(()=>{
    console.log('connected');
}).catch((error)=>{
    console.log(error.message);
})

//get all todo api route
app.get('/api/todos',async(req,res)=>{

    const todos = await  Todo.find()
    try {
        res.status(200).json(todos)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//get single note api route
app.get('/api/todos/:id',async(req,res)=>{
    const {id} = req.params
    const todo = await Todo.findById(id)
    try {
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//post api route
app.post('/api/todos',async(req,res)=>{
    const posted = new Todo(
        {name} = req.body
    )
  const saved = await posted.save()
    try {
        res.status(201).json(posted)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

//update api route

app.put('/api/todos/:id',async(req,res)=>{
    const {id} = req.params
    const data = req.body
    const updated = await Todo.findByIdAndUpdate(id,data,{new:true})
    try {
        res.status(200).json(updated)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

//delete api route 
app.delete('/api/todos/:id',async(req,res)=>{
    const {id} = req.params
    const deleted = await Todo.findByIdAndDelete(id)
    try {
        res.status(204).json({"message": "data delted successful"})
    } catch (error) {
        res.status(400).json(error.message)
    }
})

//app listening

app.listen(port,()=>console.log(`I'M listeinig on port ${port}....`))

