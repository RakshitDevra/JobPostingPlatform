import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SignUp from './components/SignUp';
import Login from './components/Login';
import JobPosting from './components/JobPosting';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/verify/:token" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/post-job" element={<JobPosting />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;