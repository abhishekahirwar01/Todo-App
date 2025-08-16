import { useEffect, useState } from "react";
import API from "../services/api";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  // FETCH TODOS
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      alert("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // CREATE
  const createTodo = async (form) => {
    try {
      await API.post("/todos", form);
      await fetchTodos();
    } catch (err) {
      alert(err?.response?.data?.message || "Create failed");
    }
  };

  // UPDATE
  const updateTodo = async (id, form) => {
    try {
      await API.put(`/todos/${id}`, form);
      setEditing(null);
      await fetchTodos();
    } catch (err) {
      alert(err?.response?.data?.message || "Update failed");
    }
  };

  // DELETE
  const deleteTodo = async (id) => {
    if (!window.confirm("Delete this todo?")) return;
    try {
      await API.delete(`/todos/${id}`);
      await fetchTodos();
    } catch (err) {
      alert(err?.response?.data?.message || "Delete failed");
    }
  };

  // TOGGLE COMPLETE
  const toggleTodo = async (id) => {
    try {
      await API.patch(`/todos/toggle/${id}`);
      await fetchTodos();
    } catch (err) {
      alert(err?.response?.data?.message || "Toggle failed");
    }
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>

      {/* Create Form */}
      {!editing && (
        <section>
          <h3>Create a new Todo</h3>
          <TodoForm onSubmit={createTodo} submitLabel="Add Todo" />
        </section>
      )}

      {/* Edit Form */}
      {editing && (
        <section>
          <h3>Edit Todo</h3>
          <TodoForm
            initial={editing}
            onSubmit={(form) => updateTodo(editing._id, form)}
            submitLabel="Update Todo"
          />
          <button className="btn" onClick={() => setEditing(null)}>
            Cancel
          </button>
        </section>
      )}

      {/* Todos List */}
      <section style={{ marginTop: 24 }}>
        <h3>My Todos</h3>
        {loading && <p>Loading...</p>}
        {!loading && todos.length === 0 && (
          <div className="muted">No todos yet. Add one above!</div>
        )}
        <div className="list">
          {todos.map((t) => (
            <TodoItem
              key={t._id}
              todo={t}
              onToggle={toggleTodo}
              onEdit={setEditing}
              onDelete={deleteTodo}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
