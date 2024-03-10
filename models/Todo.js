import mongoose from "mongoose";
const TodoSchema = new mongoose.Schema({
    name:String,
    email:String,
    task:String,
    isDone: { type: Boolean, default: false }
});
 const Todo = mongoose.model('Todo',TodoSchema);
 export default Todo