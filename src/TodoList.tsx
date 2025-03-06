import { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react"
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { ColDef } from "ag-grid-community"
import TodoTable from "./TodoTable";
import { Todo } from "./types";
import './App.css'

ModuleRegistry.registerModules([AllCommunityModule]);


function TodoList() {
    // Declare states
    const [todo, setTodo] = useState<Todo>({ description: '', priority: '', date: '' });
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = () => {
        if (todo.description && todo.date) {
            setTodos([...todos, todo]);
            setTodo({ description: '', priority: '', date: '' });
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTodo(prevTodo => ({ ...prevTodo, [name]: value }));
    };

    const handleDelete = () => {
        if (gridRef.current?.api.getSelectedNodes().length) {
            setTodos(
                todos.filter(
                    (_, index) => index !== Number(gridRef.current?.api.getSelectedNodes()[0].id)
                )
            )
        } else {
            alert("Select a row first!")
        }
    }

    const [columnDefs] = useState<ColDef<Todo>[]>([
        {
            field: "description",
            sortable: false,
            filter: true
        },
        {
            field: "priority",
            filter: true,
            cellStyle: (params) =>
                params.value === "High" ? { color: "red" } : { color: "black" },
        },
        {
            field: "date",
            sortable: true,
            filter: true
        },
    ]);

    const gridRef = useRef<AgGridReact<Todo>>(null);

    return (
        <>
            <div className="App">
                <header><h1>Simple Todolist</h1></header>

                <main>
                    <fieldset>
                        <legend>Add todo:</legend>
                        <label htmlFor="description">Description</label>
                        <input
                            name="description"
                            placeholder="Description"
                            onChange={handleChange}
                            value={todo.description}
                        />
                        <label htmlFor="priority">Priority</label>
                        <input
                            id="priority"
                            name="priority"
                            placeholder="Priority"
                            onChange={handleChange}
                            value={todo.priority}
                        />
                        <label htmlFor="date">Date</label>
                        <input
                            name="date"
                            placeholder="Date"
                            type="date"
                            onChange={handleChange}
                            value={todo.date}
                        />
                        <button onClick={addTodo}>Add</button>
                        <button onClick={handleDelete}>Delete</button>

                    </fieldset>
                    <div style={{ width: 700, height: 500 }}>
                        <AgGridReact
                            ref={gridRef}
                            rowData={todos}
                            columnDefs={columnDefs}
                            rowSelection="single"
                        />
                    </div>

                </main>
            </div>
        </>
    );
}

export default TodoList;