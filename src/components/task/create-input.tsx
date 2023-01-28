import type { PropFunction } from "@builder.io/qwik";
import type { Task } from "~/lib/task";
import { component$, useStore } from "@builder.io/qwik";

export interface CreateTaskProps {
  onAdd$: PropFunction<(data: Task) => void>;
}

const CreateTask = component$((props: CreateTaskProps) => {
  const task: Task = useStore({
    name: "",
    createdAt: new Date(),
    isCompleted: false,
    id: new Date().getTime(),
  });

  return (
    <div class="bg-gray-300 p-1 flex items-center gap-2 rounded-md w-full">
      <input
        class="px-2 w-full py-1 rounded-md"
        type="text"
        value={task.name}
        onChange$={({ target }) => (task.name = target.value)}
      />
      <button
        onClick$={() => props.onAdd$(task)}
        class="rounded-md bg-blue-500 p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-4 h-4 fill-white"
        >
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      </button>
    </div>
  );
});

export default CreateTask;
