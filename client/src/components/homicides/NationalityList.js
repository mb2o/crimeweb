import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';
import useStats from '../hooks/useStats';

export default function NationalityList(props) {
  const [data, isLoading] = useStats(`/api/homicides/homicidesPerNationality`, {
    stats: []
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div>
      <h1 className="text-primary">Nationaliteiten</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <table className="ui selectable striped table">
          <thead>
            <tr>
              <th>Nationaliteit</th>
              <th>Aantal Slachtoffers</th>
            </tr>
          </thead>
          <tbody>
            {data.stats.map(stat => (
              <tr key={stat.id}>
                <td>
                  <Link to={`/homicides/nationalities/country/${stat.id}`}>
                    {stat.country}
                  </Link>
                </td>
                <td>{stat.homicides}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
