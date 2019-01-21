import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteList } from '../../../../../actions/lists';

class ListsItem extends Component {
  handleDelete = (e) => {
    this.props.deleteList({ listId: this.props.listId });
  }

  render() {
    const { listTitle, listId } = this.props;
    return (
      <li className="lists__item">
        <div className="lists__checkbox"></div>
        <Link key={listId} to={`/dashboard/lists/${listId}`} className='lists__link'>
          <div className="lists__item-title lists__item-title--ml lists__item-title--font">{listTitle}</div>
        </Link>
        <div className="lists__btns">
          <span className="lists__delete" onClick={this.handleDelete}/>
        </div>
      </li>
    );
  }
}

export default connect(null, { deleteList })(ListsItem);
