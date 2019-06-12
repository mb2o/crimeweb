import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AgeCounter() {
  const [data, setData] = useState({ count: 0 });

  useEffect(() => {
    const fetchCount = async () => {
      const result = await axios.get('/api/stats/averageAge');
      setData({ count: result.data[0].count });
    };

    fetchCount();
  }, []);

  return (
    <div className="ui yellow statistic">
      <div className="value">{data.count}</div>
      <div className="label">
        Gemiddelde
        <br />
        Leeftijd
      </div>
    </div>
  );
}
