import React from 'react';
import useCount from './useCount';

export default function AgeCounter() {
  const data = useCount('/api/stats/averageAge', { count: 0 });

  return (
    <div className="ui yellow statistic">
      <div className="value">{data[0].count}</div>
      <div className="label">
        Gemiddelde
        <br />
        Leeftijd
      </div>
    </div>
  );
}
