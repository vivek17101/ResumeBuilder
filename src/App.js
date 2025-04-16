import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResumeEditor from './components/ResumeEditor';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<ResumeEditor />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;