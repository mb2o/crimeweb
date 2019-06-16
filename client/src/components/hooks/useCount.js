import { useEffect, useState } from 'react';
import axios from 'axios';

export default (url, initialState) => {
  const [data, setData] = useState(initialState);

  useEffect(() => {
    const fetchCount = async () => {
      const result = await axios.get(url);

      setData({ count: result.data[0].count });
    };

    fetchCount();
  }, []);

  return [data];
};
