import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Main from "./Main/Main";
import { getLocation } from "./features/locationSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLocation());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
