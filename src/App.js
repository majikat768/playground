import logo from './logo.svg';
import { Tictactoe } from './tictactoe/Tictactoe';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { NavBar } from './NavBar';
import { Minesweeper } from './minesweeper/Minesweeper';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/playground/tictactoe" element={<Tictactoe />} />
          <Route path="/playground/minesweeper" element={<Minesweeper />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
