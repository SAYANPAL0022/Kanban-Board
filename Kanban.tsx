import { useState } from 'react';
import { useTaskStore } from './store';

const columns = ["todo", "inprogress", "review", "done"];

export default function Kanban() {
    const tasks = useTaskStore((s) => s.tasks);
    const updateTask = useTaskStore((s) => s.updateTask);
    const [dragged, setDragged] = useState<string | null>(null);
    const [sort, setSort] = useState<"title" | "priority">("title");

    const sorted = [...tasks].sort((a, b) =>
        a[sort].localeCompare(b[sort])
    );

    const onDragStart = (id: string) => {
        setDragged(id);
    };

    const onDrop = (status: string) => {
        if (dragged) {
            updateTask(dragged, status as any);
            setDragged(null);
        }
    };

    return (
        <div>
            <div className="mb-4 flex gap-2">
                <button
                    onClick={() => setSort("title")}
                    className={`px-4 py-2 rounded ${sort === "title" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    Sort by Title
                </button>
                <button
                    onClick={() => setSort("priority")}
                    className={`px-4 py-2 rounded ${sort === "priority" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    Sort by Priority
                </button>
            </div>
            <div className="flex gap-4">
                {columns.map((col) => (
                    <div
                        key={col}
                        className="w-1/4 bg-gray-100 p-2"
                        onDrop={() => onDrop(col)}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <h2 className="font-bold">{col}</h2>

                        {sorted
                            .filter((t) => t.status === col)
                            .map((task) => (
                                <div
                                    key={task.id}
                                    className="bg-white p-2 my-2 shadow"
                                    draggable
                                    onDragStart={() => onDragStart(task.id)}
                                >
                                    {task.title}
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
}