import { useContext, useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Item from './Item';
import { PodcastContext, ThemeContext } from './app-context';

const useWindowWidth = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    const handleWidth = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWidth);
    return () => {
      window.removeEventListener('resize', handleWidth);
    };
  });

  return width;
};

function App() {
  const podcast = useContext(PodcastContext);
  const theme = useContext(ThemeContext);

  const [count, setCount] = useState<number>(0);

  const [value, changeValue] = useState<string>('');

  const [userInfo, setUserInfo] = useState({});

  const handleChangeValue = (e: any) => {
    changeValue(e.target.value);
  };

  useEffect(() => {
    document.title = value;
  });

  useEffect(() => {
    (async () => {
      const response = await fetch('https://api.randomuser.me/');
      const json = await response.json();
      const [userData] = json.results;
      setUserInfo(userData);
    })();
  }, [count]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      <div className={`card ${theme}`}>
        <Item label="Podcast">
          <h4>{podcast}</h4>
        </Item>

        <Item label="Counter is">
          <h4>{count}</h4>
          <button onClick={() => setCount((count) => count + 1)}>
            ClickMe
          </button>
        </Item>

        <Item label={`Type here ${value}`}>
          <input value={value} onChange={handleChangeValue}></input>
        </Item>

        <Item label="Width is">
          <h4>{useWindowWidth()}</h4>
        </Item>

        <Item label="Fetched User">
          <div>
            {userInfo ? `${userInfo.name.first} ${userInfo.name.last} ` : ''}
          </div>
        </Item>
      </div>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
