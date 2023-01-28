import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import HeroSection from "~/components/hero";
import CreateTask from "~/components/task/create-input";
import Task from "~/components/task/task";
import { useTask } from "~/lib/task";

export default component$(() => {
  const { addTask$, removeTask$, updateTask$, taskStore } = useTask();
  return (
    <div>
      <HeroSection />
      <div class="w-full relative text-2xl -top-5 flex justify-center">
        <div class="w-1/2">
          <CreateTask onAdd$={addTask$} />
        </div>
      </div>
      <div class="flex gap-5 flex-wrap mt-10 px-16 text-xl">
        {taskStore.tasks.map((task) => (
          <Task task={task} onRemove$={removeTask$} onEdit$={updateTask$} />
        ))}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik todo app",
  meta: [
    {
      name: "description",
      content: "Qwik Beginner",
    },
  ],
};
