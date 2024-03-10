import express from "express"
import mongoose from "mongoose"
import Todo from "./models/Todo.js"

const app = express()
const port = 3000

// Connect to MongoDB
async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
connectToDatabase();
app.use(express.json());

app.set('view engine', 'ejs')

// Render index page
app.get('/users', (req, res) => {
    res.render("index")
})
app.get('/allusers', async (req, res) => {
    try {
        const allUsers = await Todo.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new user
app.post('/users', async (req, res) => {
    try {
        const { name, email, task, isDone } = req.body;
        const newUser = new Todo({
            name,
            email,
            task,
            isDone,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// Delete a user
app.delete('/users/:task', async (req, res) => {
    try {
        const deleteUser = await Todo.findOneAndDelete(req.params.task);
        if (!deleteUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully", deleteUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
