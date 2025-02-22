import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InputComp from './Components/InputComp';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<InputComp />} />
      </Routes>
    </Router>
  )
}

export default App;