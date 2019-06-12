import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomicideCounter() {
  const [data, setData] = useState({ count: 0 });

  useEffect(() => {
    const fetchCounter = async () => {
      const result = await axios.get('/api/stats/homicideCount');

      setData({ count: result.data[0].count });
    };

    fetchCounter();
  }, []);

  return (
    <div className="ui red statistic">
      <div className="value">{data.count}</div>
      <div className="label">Moorden</div>
    </div>
  );
}
