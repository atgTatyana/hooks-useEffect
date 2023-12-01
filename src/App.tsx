import { useEffect, useState } from 'react';
import './App.css';
import { List } from './components/List';

export interface IUser {
  id: number,
  name: string,
}

function App() {
  const [list, setList] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(import.meta.env.VITE_DATA_URL + `users.json`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setList(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  
  return (
    <>
      <List list={list} />
      {loading && <p>Loading...</p>}
    </> 
  )
}

export default App
