import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ item }) => {
  return (
    <div >
      <img src={item.imageUrl} />
      <div>{item.name}</div>
      <div>{item.price}</div>
    </div>
  );
};

export default Item;
// style={{color: '#2F4F4F'}}