import { useClientEffect$, useStore, $ } from "@builder.io/qwik";

export interface Task {
  id: number;
  name: string;
  createdAt: Date;
  isCompleted: boolean;
}

export const TASKS_KEY = "tasks";

export const useTask = () => {
  const taskStore = useStore<{ tasks: Task[] }>({
    tasks: [],
  });

  useClientEffect$(() => {
    const storageTasks = localStorage.getItem(TASKS_KEY);

    if (!storageTasks) {
      return;
    }

    taskStore.tasks = JSON.parse(storageTasks);
  });

  const addTask$ = $((data: Task) => {
    if (data.name === "") {
      return;
    }

    taskStore.tasks = [...taskStore.tasks, data];
    localStorage.setItem(TASKS_KEY, JSON.stringify(taskStore.tasks));
  });

  const removeTask$ = $((id: number) => {
    const newTasks = taskStore.tasks.filter((task) => task.id !== id);
    taskStore.tasks = newTasks;
    localStorage.setItem(TASKS_KEY, JSON.stringify(taskStore.tasks));
  });

  const updateTask$ = $((data: Task) => {
    if (data.name === "") {
      return;
    }

    const filteredTasks = taskStore.tasks.filter((task) => task.id !== data.id);
    filteredTasks.push(data);
    taskStore.tasks = filteredTasks;
    localStorage.setItem(TASKS_KEY, JSON.stringify(taskStore.tasks));
  });

  return {
    taskStore,
    addTask$,
    removeTask$,
    updateTask$,
  };
};
