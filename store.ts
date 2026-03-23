import { create } from "zustand";

export type Task = {
    id: string;
    title: string;
    status: "todo" | "inprogress" | "review" | "done";
    priority: "low" | "medium" | "high";
    dueDate: string;
};

type Store = {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    updateTask: (id: string, status: Task["status"]) => void;
};

export const useTaskStore = create<Store>((set) => ({
    tasks: [],
    setTasks: (tasks) => set({ tasks }),

    updateTask: (id, status) =>
        set((state) => ({
            tasks: state.tasks.map((t) =>
                t.id === id ? { ...t, status } : t
            ),
        })),
}));