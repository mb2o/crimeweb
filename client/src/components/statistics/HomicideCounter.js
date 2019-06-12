import React from 'react';
import useCount from '../hooks/useCount';

export default function HomicideCounter() {
  const data = useCount('/api/stats/homicideCount', { count: 0 });

  return (
    <div className="ui red statistic">
      <div className="value">{data[0].count}</div>
      <div className="label">Moorden</div>
    </div>
  );
}
