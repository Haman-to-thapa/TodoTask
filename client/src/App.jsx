import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://todotask-bzfz.onrender.com/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editId, setEditId] = useState(null);

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API, form);
    }
    setForm({ name: '', description: '' });
    fetchTasks();
  };

  const handleEdit = (task) => {
    setForm({ name: task.name, description: task.description });
    setEditId(task.id);
  };

  const handleDelete = async id => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Task Manager
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Task Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            <div>
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition min-h-[100px]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              {editId ? 'Update Task' : 'Add Task'}
            </button>
          </form>

          <div className="mt-8 space-y-4">
            {tasks.map(task => (
              <div
                key={task.id}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition"
              >
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {task.name}
                </h4>
                <p className="text-gray-600 mb-4">{task.description}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
