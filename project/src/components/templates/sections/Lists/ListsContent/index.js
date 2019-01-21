import React from 'react';
import { connect } from 'react-redux';

import ListsItem from './ListsItem';

const ListsContent = (props) => {
  const { lists } = props;
  const tmpl = lists.map((list) => {
    return (
      <ListsItem key={list.id} listId={list.id} listTitle={list.listTitle} />
    );
  });

  return (
    <ul className="lists__list">
      { tmpl }
    </ul>
  );
};

export default connect((state) => {
  return {
    lists: state.user.lists,
  };
}, {})(ListsContent);
