import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Routes/Home';
import Tv from './Routes/Tv';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/tv' element={<Tv />}></Route>
        <Route path='/search' element={<Home />}></Route>
        <Route path='/' element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
