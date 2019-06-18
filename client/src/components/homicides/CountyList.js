import React from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';
import useStats from '../hooks/useStats';

export default function CountyList() {
  const [data, isLoading] = useStats('/api/homicides/homicidesPerCounty', {
    stats: []
  });

  return (
    <div>
      <h1 className="text-primary">Provincies</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <table className="ui selectable striped table">
          <thead>
            <tr>
              <th>Provincie</th>
              <th>Aantal Moorden</th>
            </tr>
          </thead>
          <tbody>
            {data.stats.map(stat => (
              <tr key={stat.county}>
                <td>
                  <Link to={`/homicides/geographical/${stat.county}`}>
                    {stat.county}
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
