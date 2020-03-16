import React from 'react';
import {Link} from 'react-router-dom';

const Card = () => (
  <div className="card">
    <img src={''} alt={''} className="card-img-top"/>
    <div className="card-body">
      <h5 className="card-title">React</h5>
      <Link to={'/profile/'} className="btn btn-primary">Открыть</Link>
    </div>
  </div>
);

export default Card;