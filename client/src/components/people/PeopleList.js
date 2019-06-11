import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Spinner from '../layout/Spinner';

const PEOPLE_SERVICE_URL = '/api/people';

export default function PeopleList() {
  const [data, setData] = useState({ people: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);

      const result = await axios.get(PEOPLE_SERVICE_URL);

      setData({ people: result.data });
      setIsLoading(false);
    };

    fetchPeople();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <table className="ui selectable striped table">
          <thead>
            <tr>
              <th />
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
                  <img className="ui avatar image" src={person.photo} alt="" />
                </td>
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
      )}
    </div>
  );
}
