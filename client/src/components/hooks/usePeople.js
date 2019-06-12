import { useEffect, useState } from 'react';
import axios from 'axios';

export default (url, initialState) => {
  const [data, setData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCount = async () => {
      setIsLoading(true);

      const result = await axios.get(url);

      setData({ people: result.data });
      setIsLoading(false);
    };

    fetchCount();
  }, []);

  return [data, isLoading];
};
