import React from 'react';
import useCount from '../hooks/useCount';

export default function NationalityCounter() {
  const data = useCount('/api/stats/nationalityCount', { count: 0 });

  return (
    <div className="ui green statistic">
      <div className="value">{data[0].count}</div>
      <div className="label">Nationaliteiten</div>
    </div>
  );
}
