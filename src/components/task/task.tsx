import type { PropFunction } from "@builder.io/qwik";
import { useSignal, $ } from "@builder.io/qwik";
import { Task } from "~/lib/task";
import { component$ } from "@builder.io/qwik";

interface TaskProps {
  task: Task;
  onRemove$: PropFunction<(id: number) => void>;
  onEdit$: PropFunction<(data: Task) => void>;
}

const Task = component$((props: TaskProps) => {
  const isEditing = useSignal(false);
  const taskName = useSignal("");

  const handleChangeTaskName$ = $((value: string) => {
    taskName.value = value;
  });

  const handleNameChange = $(() => {
    const isUpdateConfirm = confirm(
      "Are you sure you want to update the task?"
    );
    if (isUpdateConfirm) {
      props.onEdit$({
        ...props.task,
        name: taskName.value,
      });
      isEditing.value = false;
    }
  });

  const handleCompletedTask$ = $(() => {
    props.onEdit$({
      ...props.task,
      isCompleted: !props.task.isCompleted,
    });
  });

  return (
    <div class="flex">
      <button
        class="self-center px-1 hover:cursor-pointer"
        onClick$={() => props.onRemove$(props.task.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-5 h-5 fill-red-400 hover:fill-red-500"
        >
          <path
            fillRule="evenodd"
            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div class="flex gap-1 px-1 w-44 py-1 bg-gray-300 rounded-md">
        {isEditing.value ? (
          <input
            class="bg-white px-2 py-1 rounded-md flex-2 w-full"
            type="text"
            autoFocus
            value={props.task.name}
            onChange$={({ target }) => handleChangeTaskName$(target.value)}
            onBlur$={() => handleNameChange()}
          />
        ) : (
          <p
            class="bg-white px-2 py-1 rounded-md flex-2 w-full"
            onClick$={() => (isEditing.value = true)}
          >
            {props.task.name}
          </p>
        )}
        <div class="flex items-center justify-center flex-1 px-2">
          <input
            type="checkbox"
            checked={props.task.isCompleted}
            onClick$={() => handleCompletedTask$()}
          />
        </div>
      </div>
    </div>
  );
});

export default Task;
