import React, { useState } from 'react';

const Header = ({ setSearchQuery, selectedLanguage, setSelectedLanguage }) => {
  const [inputQuery, setInputQuery] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(inputQuery)
  }

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setDropdownOpen(false); // Close the dropdown after selection
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };

  return (
    <div className="page-bar">
      <div className="header">
        Sport<span>Pulse</span>
        {/* Search Bar */}
        <div className="search-bar-container">
          <form id="search-form" style={{ display: 'flex', alignItems: 'center' }} onSubmit={handleSubmit} >
            <input 
              type="text" 
              name="query" 
              id="search-input" 
              className="search-bar" 
              placeholder="Search sports/teams/players.." 
              onInput={(event) => setInputQuery(event.target.value)}
              required 
            />
            <button type="submit" id="search-button" className="search-icon-button">
              {/* SVG for the magnifying glass icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Translation Dropdown positioned on the top-right of the page */}
      <div className="translation-container" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
        <button className="translation-button" onClick={toggleDropdown}>
          {selectedLanguage}
          <span className="dropdown-icon">&#9662;</span> {/* Downward arrow icon */}
        </button>
        {isDropdownOpen && ( // Conditionally render dropdown
          <div className="translation-dropdown">
            <ul>
              <li className="language-option" onClick={() => handleLanguageChange('English')}>
                English
              </li>
              <li className="language-option" onClick={() => handleLanguageChange('Dutch')}>
                Dutch
              </li>
              <li className="language-option" onClick={() => handleLanguageChange('Lithuanian')}>
                Lithuanian
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
