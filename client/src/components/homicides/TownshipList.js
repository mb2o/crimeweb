import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';
import useStats from '../hooks/useStats';

export default function CountyList(props) {
  let county = props.match.params.county;

  if (!county) {
    props.history.push('/homicides');
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const [data, isLoading] = useStats(
    `/api/stats/homicidesPerTownship?county=${county}`,
    {
      stats: []
    }
  );

  return (
    <div>
      <h1 className="text-primary">Gemeenten</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <table className="ui selectable striped table">
          <thead>
            <tr>
              <th>Gemeente</th>
              <th>Aantal Moorden</th>
            </tr>
          </thead>
          <tbody>
            {data.stats.map(stat => (
              <tr key={stat.township}>
                <td>
                  <Link to={`/homicides/${county}/${stat.township}`}>
                    {stat.township}
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
