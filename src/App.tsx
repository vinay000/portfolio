import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RootRoutes from './routes/RootRoutes';
import { ReactLenis } from '@studio-freight/react-lenis';
import { CustomCursor } from './components/CustomCursor';
import { TeslaGridCanvas } from './components/TeslaGridCanvas';

const App: React.FC = () => {
  return (
    <ReactLenis root>
      <Router>
        <CustomCursor />
        <TeslaGridCanvas />
        <RootRoutes />
      </Router>
    </ReactLenis>
  );
};

export default App;





