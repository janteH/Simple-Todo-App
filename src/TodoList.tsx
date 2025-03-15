import { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react"
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { ColDef } from "ag-grid-community"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Stack from "@mui/material/Stack"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TodoTable from "./TodoTable";
import { Todo } from "./types";
import './App.css'

ModuleRegistry.registerModules([AllCommunityModule]);


function TodoList() {
    // Declare states
    const [todo, setTodo] = useState<Todo>({ description: '', priority: '', date: '' });
    const [todos, setTodos] = useState<Todo[]>([]);
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

    const addTodo = () => {
        if (todo.description && selectedDate) {
            const newTodo = { ...todo, date: selectedDate.format("YYYY-MM-DD") };
            setTodos((prevTodos) => [...prevTodos, newTodo]);
            setTodo({ description: "", priority: "", date: "" });
            setSelectedDate(null);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTodo(prevTodo => ({ ...prevTodo, [name]: value }));
    };

    const handleDateChange = (date: dayjs.Dayjs | null) => {
        setSelectedDate(date);
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

                <main>

                    <Stack direction="row" spacing={2}>

                        <TextField
                            name="description"
                            label="Description"
                            onChange={handleChange}
                            value={todo.description}
                        />
                        <TextField
                            id="priority"
                            name="priority"
                            label="Priority"
                            onChange={handleChange}
                            value={todo.priority}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Date" value={selectedDate} onChange={handleDateChange} />
                        </LocalizationProvider>

                        <Button onClick={addTodo} variant="contained">Add</Button>
                        <Button onClick={handleDelete} variant="outlined" color="error">Delete</Button>

                    </Stack>
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