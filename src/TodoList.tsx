import { useState } from "react";
import TodoTable from "./TodoTable";
import { Todo } from "./types";

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
            <h3>Add Todo</h3>
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
            <TodoTable todos={todos} handleDelete={handleDelete} />
        </>
    );
}

export default TodoList;