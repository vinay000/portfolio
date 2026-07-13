import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RootRoutes from './routes/RootRoutes';
import { ThemeProvider } from './components/ThemeProvider';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <div id="portfolio-content" className="w-full min-h-screen">
          <RootRoutes />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;





