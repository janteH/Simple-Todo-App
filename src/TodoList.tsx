import { useState } from "react";
import TodoTable from "./TodoTable";
import { Todo } from "./types";
import './App.css'


function TodoList() {
    // Declare states
    const [todo, setTodo] = useState<Todo>({ description: '', date: '' });
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = () => {
        if (todo.description && todo.date) {
            setTodos([...todos, todo]);
            setTodo({ description: '', date: '' });
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTodo(prevTodo => ({ ...prevTodo, [name]: value }));
    };

    const handleDelete = (index: number) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    return (
        <>
            <div className="App">
                <header><h1>Simple Todolist</h1></header>

                <main>
                    <fieldset>
                        <legend>Add todo:</legend>
                        <input
                            name="description"
                            placeholder="Description"
                            onChange={handleChange}
                            value={todo.description}
                        />
                        <input
                            name="date"
                            placeholder="Date"
                            type="date"
                            onChange={handleChange}
                            value={todo.date}
                        />
                        <button onClick={addTodo}>Add</button>

                    </fieldset>
                    <TodoTable todos={todos} handleDelete={handleDelete} />

                </main>
            </div>
        </>
    );
}

export default TodoList;