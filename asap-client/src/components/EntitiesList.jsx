import { useEffect, useState } from "react";
import { fetchEntities } from "../api";

const EntitiesList = () => {
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    const getEntities = async () => {
      const data = await fetchEntities();
      setEntities(data);
    };
    getEntities();
  }, []);

  return (
    <div>
      <h2>Entities</h2>
      <ul>
        {entities.length > 0 ? (
          entities.map((entity) => (
            <li key={entity._id}>{entity.name}</li>
          ))
        ) : (
          <p>No entities found.</p>
        )}
      </ul>
    </div>
  );
};

export default EntitiesList;
