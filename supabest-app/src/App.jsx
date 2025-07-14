import { useState, useEffect } from "react"
import "./App.css"
import supabase from "./supabase-client"

function App() {
  const [todoList, setTodoList] = useState([])
  const [newTodo, setNewTodo] = useState("")

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("ToDoList")
      .select("*");

    if (error) {
      console.error("Error fetching todos:", error);
    } else {
      setTodoList(data);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    const newTodoData = {
      name: newTodo,
      isCompleted: false
    };

    const { data, error } = await supabase
      .from("ToDoList")
      .insert([newTodoData])
      .select()
      .single();

    if (error) { 
      console.error("Error adding todo:", error); 
    } else {
      setTodoList((prev) => [...prev, data]);
      setNewTodo("");
    }

  };
  
  const completeTask = async (id, isCompleted) => {
    const { data, error } = await supabase
      .from("ToDoList")
      .update({ isCompleted: !isCompleted })
      .eq('id', id).select().single();

      if (error) {
        console.error("Error updating todo:", error);
      } else {
        setTodoList((prev) => prev.map(todo => todo.id === id ? data : todo));
      }
  }

  const deleteTask = async (id) => {
    try {
      const { error } = await supabase
        .from("ToDoList")
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Error deleting todo:", error);
        return; // Exit early if there's an error
      }
      
      setTodoList((prev) => prev.filter(todo => todo.id !== id));
    } catch (e) {
      console.error("Unexpected error:", e);
    }
  };


  
  return (
    <div>
      <h1>Supabest</h1>
      <div>
        <input 
          type="text" 
          placeholder="New ToDo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo Item</button>
      </div>
      <ul>
        {todoList.map((todo) => (
          <li>
            <p>{todo.name}</p>
            <button  onClick={ () => completeTask(todo.id, todo.isCompleted) }>
              {""}
              { todo.isCompleted ? "Undo" : "Completed Task"}</button>
            <button onClick={() => deleteTask(todo.id) }>Delete Task</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
