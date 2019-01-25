import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleError } from '../../../actions';
import { addList } from '../../../actions/lists';

import ValidationHoc from '../../HOC/ValidationHoc';
import Btn from '../common/Btn';
import ListAddInputGroup from '../sections/ListAdd/ListAddInputGroup';

class ListAdd extends Component {
  state = {
    listTitle: '',
  }

  handleChange = (type) => (e) => {
    this.setState({ [type]: e.target.value });
  }

  handleCreateDomain = (e) => {
    e.preventDefault();
    const { listTitle } = this.state;
    if (!listTitle) {
      this.props.handleError('Вы не ввели название');
      return 0;
    }
    const list = {
      id: Math.round(Math.random() * 100),
      listTitle,
      todos: [],
    };
    this.props.addList(list);
  }

  render() {
    return (
      <div className="list-add">
        <h2 className="list-add__title">Add List</h2>
        <ValidationHoc>
          <form action="" className="list-add__form">
            <ListAddInputGroup title='List title' subtitle='Title of new list'>
              <input
                type="text"
                className="list-add__input"
                placeholder='Title of list'
                value={this.state.listTitle}
                onChange={this.handleChange('listTitle')}
              />
            </ListAddInputGroup>

            <div className="list-add__btns">
              <Btn href='/dashboard/lists/' text='Back to List' type='grey'/>
              <div className="list-add__create-btn-pos">
                <Btn href='#' text='Create' type='blue' onClick={this.handleCreateDomain}/>
              </div>
            </div>
          </form>
        </ValidationHoc>
      </div>
    );
  }
}

export default connect(null, { handleError, addList })(ListAdd);
