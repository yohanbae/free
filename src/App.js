import React from 'react';
import './App.css';
import Intro from "./components/Intro";
import Questions from "./components/Questions";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <Intro />
    <Questions />
    <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange={false}
          draggable={false}
          pauseOnHover={false}
    />
    </>
  );
}

export default App;
