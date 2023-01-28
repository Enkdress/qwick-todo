import { component$, Slot } from "@builder.io/qwik";
import "../global.css";

export default component$(() => {
  return (
    <>
      <main>
        <section>
          <Slot />
        </section>
      </main>
    </>
  );
});
