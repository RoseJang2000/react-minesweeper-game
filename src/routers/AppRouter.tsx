import Help from 'pages/help/Help';
import Play from 'pages/play/Play';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Play />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
