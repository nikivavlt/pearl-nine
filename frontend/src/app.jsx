import { useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Main from './components/main';
import './styles.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  return (
    <div>
      <Header setSearchQuery={setSearchQuery} selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
