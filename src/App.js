import { useState } from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');
  const [toast, setToast] = useState('');

  const rules = {
    upper: /[A-Z]/,
    lower: /[a-z]/,
    number: /[0-9]/,
    symbol: /[^A-Za-z0-9]/,
  };

  const combinations = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

  const generatePassword = () => {
    let pass = '';
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * combinations.length);
      pass += combinations.charAt(randomIndex);
    }
    setPassword(pass);
    checkStrength(pass);
  };

  const checkStrength = (pass) => {
    let score = 0;
    if (rules.upper.test(pass)) score++;
    if (rules.lower.test(pass)) score++;
    if (rules.number.test(pass)) score++;
    if (rules.symbol.test(pass)) score++;

    if (score <= 2) setStrength('Weak');
    else if (score === 3) setStrength('Medium');
    else setStrength('Strong');
  };

  const copyPassword = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setToast('Password copied successfully');
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <div className="password-generator-app">
      <div>
        <header>
        <h1>Secure Password Generator</h1>
        <p className="subtitle">Create strong & secure passwords instantly</p>
      </header>

      <section className="generator">
        <input type="text" value={password} placeholder="Your password will appear here" readOnly />

        <div className={`strength ${strength.toLowerCase()}`}>
          {strength && `Password Strength: ${strength}`}
        </div>

        <div className="btn-group">
          <button onClick={generatePassword}>Generate Password</button>
          <button className="copy" onClick={copyPassword}>Copy</button>
        </div>

        {toast && <div className="toast">{toast}</div>}
      </section>

      <section className="rules-section">
        <h2>Password Rules</h2>
        <p>The generated password follows these security rules:</p>
        <ul className="rules">
          <li className={rules.upper.test(password) ? 'active' : ''}>Contains Uppercase Letters (A-Z)</li>
          <li className={rules.lower.test(password) ? 'active' : ''}>Contains Lowercase Letters (a-z)</li>
          <li className={rules.number.test(password) ? 'active' : ''}>Contains Numbers (0-9)</li>
          <li className={rules.symbol.test(password) ? 'active' : ''}>Contains Special Characters</li>
        </ul>
      </section>
      </div>
  <div>
      <section className="info">
        <h2>How This App Works</h2>
        <p>
          This application generates a random password by selecting characters
          from a secure character set. Each click creates a completely new
          password, making it difficult to predict or duplicate.
        </p>

        <h2>Why Strong Passwords Are Important</h2>
        <p>
          Strong passwords protect your online accounts from unauthorized access.
          They significantly reduce the risk of cyber attacks such as brute-force
          and credential stuffing attacks.
        </p>

        <h2>Risks of Weak Passwords</h2>
        <p>
          Weak passwords are one of the most common reasons for data breaches.
          Simple or reused passwords can be cracked in seconds, exposing
          sensitive personal and financial information.
        </p>
      </section>

      <footer>
        <p>Built with React • Focused on Security Awareness</p>
      </footer>
    </div>
    </div>

  );
}

export default App;