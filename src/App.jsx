import { BrowserRouter, Routes, Route } from 'react-router-dom';

import OpeningAnimation from './pages/OpeningAnimation';
import AnimationControls from './pages/AnimationControls';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OpeningAnimation />} />
        <Route
          path="/controls"
          element={<AnimationControls />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;