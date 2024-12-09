import React from 'react';
import './styles/Global.css';
import Board from './components/Board.tsx';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Board />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;