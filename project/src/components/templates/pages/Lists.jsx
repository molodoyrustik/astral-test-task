import React from 'react';

import Btn from '../common/Btn';

import ListsNav from '../sections/Lists/ListsNav';
import ListsContent from '../sections/Lists/ListsContent';

const Lists = (props) => {
  return (
    <div className="lists">
      <h2 className="lists__title">Shopping Lists</h2>
      <div className="lists__content">
        <ListsNav/>
        <ListsContent/>
      </div>
      <Btn href='/dashboard/list/add-list' text='Add new' type='blue'/>
    </div>
  );
};

export default Lists;
