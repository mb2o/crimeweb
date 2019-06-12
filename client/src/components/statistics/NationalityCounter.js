import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function NationalityCounter() {
  const [data, setData] = useState({ count: 0 });

  useEffect(() => {
    const fetchCount = async () => {
      const result = await axios.get('/api/stats/nationalityCount');
      setData({ count: result.data[0].count });
    };

    fetchCount();
  }, []);

  return (
    <div className="ui green statistic">
      <div className="value">{data.count}</div>
      <div className="label">Nationaliteiten</div>
    </div>
  );
}
