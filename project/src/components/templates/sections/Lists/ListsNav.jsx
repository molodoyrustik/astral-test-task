import React from 'react';

const ListsNav = (props) => {
  return (
    <nav className="lists__nav">
      <div className="lists__checkbox"></div>
      <div className="lists__nav-title lists__nav-title--ml">Title</div>
      <div className="lists__btns">
        <span className="lists__delete lists__delete--cursor" />
      </div>
    </nav>
  );
};

export default ListsNav;
