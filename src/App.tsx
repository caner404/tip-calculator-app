import { Calculator } from './calculator/Calculator';
import logo from './assets/logo.svg';

function App() {
  return (
    <div className='flex flex-col items-center sm:justify-center gap-10 sm:gap-[88px] h-screen w-screen'>
      <header className='mt-8 sm:mt-12'>
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
