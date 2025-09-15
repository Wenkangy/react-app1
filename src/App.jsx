import React, { useState } from 'react';
import Search from './components/Search.jsx';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <main>
      <div className='Pattern' />
      <div className='wrapper'>
        <header>
          <img
            src='./hero.png'
            alt='helle banner'
          />

          <h1>
            Find <span className='text-gradient'>Movies</span> You Will Enjoy
            Without The Hassle
          </h1>

          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <h2>{searchTerm}</h2>
        </header>
      </div>
    </main>
  );
};

export default App;
