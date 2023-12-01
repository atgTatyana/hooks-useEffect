import { useState } from "react";
import { IUser } from "../App"
import { Details } from "./Details";

interface ListProps {
  list: IUser[],
}

export const List = ({list}: ListProps) => {
  const [id, setId] = useState<number | null>(null);
  console.log(list);
 
  return (
    <div className='view'>
      <div>
        {list.map((item) => (
          <div key={item.id} className="user" onClick={() => setId(item.id)}>
            {item.name}
          </div>
        ))}
      </div>
      {id && <Details id={id} />}
    </div>   
  )
}
