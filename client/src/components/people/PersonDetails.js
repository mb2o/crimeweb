import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Spinner from '../layout/Spinner';
import moment from 'moment';

export default function PersonDetails(props) {
  const [data, setData] = useState({ person: {} });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);

      const result = await axios.get(`/api/people/${props.match.params.id}`);

      setData({ person: result.data });
      setIsLoading(false);
    };

    fetchDetails();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="ui link cards">
            <div className="card">
              <div className="image">
                {data.person.photo && <img src={data.person.photo} />}
              </div>
              <div className="content">
                <div className="header">
                  {data.person.firstname} {data.person.lastname}
                </div>
                <div className="meta">
                  <a>{data.person.nicknames}</a>
                </div>
                <div className="description">{data.person.description}</div>
              </div>
              <div className="extra content">
                <span className="right floated">
                  {data.person.deathdate && <i className="fas fa-cross" />}
                  {data.person.deathdate &&
                    moment(data.person.deathdate).format('DD-MM-YYYY')}
                </span>
                <span>
                  <i className="user icon" />
                  {data.person.crimes && data.person.crimes.length} Misdaden
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
