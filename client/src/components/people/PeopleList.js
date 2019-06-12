import React from 'react';

import Spinner from '../layout/Spinner';
import usePeople from '../hooks/usePeople';

export default function PeopleList() {
  const [data, isLoading] = usePeople('/api/people', { people: [] });

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <table className="ui selectable striped table">
          <thead>
            <tr>
              <th />
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
                  <i
                    className={
                      'flag ' +
                      (person.birthcountry &&
                        person.birthcountry.iso_alpha_2.toLowerCase())
                    }
                  />
                </td>
                <td>
                  {person.firstname} {person.lastname.toUpperCase()}
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
