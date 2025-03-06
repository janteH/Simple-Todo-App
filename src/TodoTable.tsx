import { TodoTableProps } from "./types";
import './App.css'



function TodoTable(props: TodoTableProps) {
    return (
        <>
            <div className="App">
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Date</th>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {props.todos.map((todo, index) => (
                            <tr key={index}>
                                <td>{todo.description}</td>
                                <td>{todo.date}</td>
                                <td>
                                    <button onClick={() => props.handleDelete(index)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TodoTable;