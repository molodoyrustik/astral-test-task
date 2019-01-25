import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import ValidationHoc from '../../HOC/ValidationHoc';
import ShoppingListContent from '../sections/ShoppingList/ShoppingListContent';

class ShoppingList extends Component {
  render() {
    const listId = parseInt(this.props.match.params.listId, 10);
    return (
      <div className="todo-list">
        <Helmet>
          <title>ShoppingList</title>
        </Helmet>
        <ValidationHoc>
          <ShoppingListContent listId={listId}/>
        </ValidationHoc>
      </div>
    );
  }
}

export default (ShoppingList);
