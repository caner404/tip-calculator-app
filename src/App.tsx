import './App.css';
import { Calculator } from './calculator/Calculator';
import logo from './assets/logo.svg';

function App() {
  return (
    <div className='flex flex-col items-center justify-center gap-[88px]'>
      <header>
        <img
          src={logo}
          alt='logo'
        />
      </header>
      <Calculator />
    </div>
  );
}

export default App;
