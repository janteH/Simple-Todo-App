import './App.css'
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import TodoList from './TodoList';
import AppBar from './AppBar'

function App() {

  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <AppBar></AppBar>
      <TodoList />
    </Container>
  )
}

export default App
