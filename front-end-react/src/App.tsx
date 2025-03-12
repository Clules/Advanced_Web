import { useState } from "react";
import "./App.css";
import BookList from "./components/BookList";

function App() {
  return (
    <>
      <section className="flex justify-center items-center bg-gray-500/70 w-full min-h-screen">
        <BookList />
      </section>
    </>
  );
}

export default App;
