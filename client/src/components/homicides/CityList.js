import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';
import useStats from '../hooks/useStats';

export default function CityList(props) {
  let township = props.match.params.township;

  const [data, isLoading] = useStats(
    `/api/stats/homicidesPerCity?township=${township}`,
    {
      stats: []
    }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div>
      <h1 className="text-primary">Steden</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <table className="ui selectable striped table">
          <thead>
            <tr>
              <th>Stad</th>
              <th>Aantal Moorden</th>
            </tr>
          </thead>
          <tbody>
            {data.stats.map(stat => (
              <tr key={stat.city}>
                <td>
                  <Link to={`/people/${stat.city}`}>{stat.city}</Link>
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
