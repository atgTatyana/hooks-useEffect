import { useEffect, useState } from "react";

interface DetailsProps {
  id: number,
}

export interface IUserProfile {
  id: number,
  name: string,
  avatar: string,
  details: {
    city: string,
    company: string,
    position: string,
  }
}

export const Details = ({id}: DetailsProps) => {
  console.log(id);
  const [user, setUser] = useState<IUserProfile | null>(null)
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(import.meta.env.VITE_DATA_URL + `${id}.json` );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setUser(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    if (id) { fetchData() }
  }, [id]);

  return (
    <div className="details">
      {loading && <p>Loading...</p>}
      {!loading && user &&
        <>
          <img src={user.avatar} />
          <h4>{user.name}</h4>
          <div className="details-item">City: {user.details.city}</div>
          <div className="details-item">Company: {user.details.company}</div>
          <div className="details-item">Position: {user.details.position}</div>
        </>}
    </div>
  )
}
