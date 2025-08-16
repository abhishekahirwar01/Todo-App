export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  return (
    <div className="card todo-row">
      <div className="todo-main">
        <div className={`todo-title ${todo.completed ? "done" : ""}`}>
          {todo.title}
        </div>
        <div className="todo-desc">{todo.description}</div>
        <div className="todo-date">
          {new Date(todo.date).toLocaleDateString()}
        </div>
      </div>
      <div className="todo-actions">
        <button className="btn" onClick={() => onToggle(todo._id)}>
          {todo.completed ? "Undo" : "Complete"}
        </button>
        <button className="btn" onClick={() => onEdit(todo)}>
          Edit
        </button>
        <button className="btn danger" onClick={() => onDelete(todo._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
