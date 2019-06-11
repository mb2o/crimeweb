import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PEOPLE_SERVICE_URL = '/api/people';

export default function PeopleList() {
  const [data, setData] = useState({ people: [] });

  useEffect(() => {
    const fetchPeople = async () => {
      const result = await axios.get(PEOPLE_SERVICE_URL);
      setData({ people: result.data });
    };

    fetchPeople();
  }, []);
  return (
    <div>
      <table className="ui striped table">
        <thead>
          <tr>
            <th>Naam</th>
            <th>Leeftijd</th>
            <th>Manier van Overlijden</th>
            <th>Doodsoorzaak</th>
          </tr>
        </thead>
        <tbody>
          {data.people.map(person => (
            <tr key={person.id}>
              <td>
                {person.firstname} {person.lastname}
              </td>
              <td>{person.age}</td>
              <td>{person.manner_of_death.title}</td>
              <td>{person.cause_of_death.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
