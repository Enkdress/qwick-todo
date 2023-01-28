import { component$ } from "@builder.io/qwik";

const HeroSection = component$(() => {
  return (
    <header class="w-full px-5 py-24 bg-blue-100 rounded-b-md">
      <h1 class="text-9xl text-blue-600 text-center">Qwik ToDo</h1>
      <section class="flex gap-2 w-full justify-center items-center mt-5">
        <button
          onClick$={() =>
            (window.location.href = "https://github.com/Enkdress")
          }
          class="flex gap-2 items-center"
        >
          <img
            src="/github-mark.png"
            alt="github-logo"
            width={32}
            height={32}
          />
        </button>
        <button
          onClick$={() =>
            (window.location.href =
              "https://www.linkedin.com/in/sergio-a-correa/")
          }
          class="flex gap-2 items-center"
        >
          <img
            src="/linkedin-mark.png"
            alt="linkedin-logo"
            width={32}
            height={32}
          />
        </button>
      </section>
    </header>
  );
});

export default HeroSection;
