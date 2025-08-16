import { useState, useEffect } from "react";

export default function TodoForm({ initial, onSubmit, submitLabel = "Save" }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || "",
        description: initial.description || "",
        date: initial.date ? String(initial.date).slice(0, 10) : "",
      });
    }
  }, [initial]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.date) {
      alert("All fields are required!");
      return;
    }
    onSubmit(form);
    // reset form if creating new todo
    if (!initial) {
      setForm({ title: "", description: "", date: "" });
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="grid">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
      </div>
      <button className="btn primary" type="submit">
        {submitLabel}
      </button>
    </form>
  );
}
