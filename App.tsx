import React, { useState } from 'react';
import { useTaskStore } from './store';
import Kanban from './Kanban';

const App: React.FC = () => {
    const { tasks, setTasks, updateTask } = useTaskStore();
    const [newTask, setNewTask] = useState({
        title: '',
        status: 'todo' as const,
        priority: 'medium' as const,
        dueDate: '',
    });
    const [scrollTop, setScrollTop] = useState(0);
    const rowHeight = 50;

    const start = Math.floor(scrollTop / rowHeight);
    const end = start + 10;

    const visible = tasks.slice(start, end);

    const handleAddTask = () => {
        if (newTask.title.trim()) {
            setTasks([...tasks, { ...newTask, id: crypto.randomUUID() }]);
            setNewTask({
                title: '',
                status: 'todo',
                priority: 'medium',
                dueDate: '',
            });
        }
    };

    const handleUpdateStatus = (id: string, status: string) => {
        updateTask(id, status as any);
    };

    const handleDeleteTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Task Manager</h1>

                {/* Add Task Form */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <input
                            type="text"
                            placeholder="Task title"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            className="border p-2 rounded"
                        />
                        <select
                            value={newTask.status}
                            onChange={(e) => setNewTask({ ...newTask, status: e.target.value as any })}
                            className="border p-2 rounded"
                        >
                            <option value="todo">Todo</option>
                            <option value="inprogress">In Progress</option>
                            <option value="review">Review</option>
                            <option value="done">Done</option>
                        </select>
                        <select
                            value={newTask.priority}
                            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                            className="border p-2 rounded"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        <input
                            type="date"
                            value={newTask.dueDate}
                            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                            className="border p-2 rounded"
                        />
                    </div>
                    <button
                        onClick={handleAddTask}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Task
                    </button>
                </div>

                <div
                    className="h-96 overflow-auto border relative"
                    onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
                >
                    <div style={{ height: tasks.length * rowHeight }}>
                        {visible.map((task, index) => (
                            <div
                                key={task.id}
                                className="flex items-center p-2 border-b absolute w-full bg-white"
                                style={{ top: (start + index) * rowHeight }}
                            >
                                <span className="flex-1">{task.title}</span>
                                <span className="text-sm text-gray-600 mr-2">{task.status}</span>
                                <span className="text-sm text-gray-600 mr-2">{task.priority}</span>
                                <select
                                    value={task.status}
                                    onChange={(e) => updateTask(task.id, e.target.value as any)}
                                    className="border p-1 rounded text-sm"
                                >
                                    <option value="todo">Todo</option>
                                    <option value="inprogress">In Progress</option>
                                    <option value="review">Review</option>
                                    <option value="done">Done</option>
                                </select>
                                <button
                                    onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;