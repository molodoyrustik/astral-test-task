import React from 'react';

const DomainAddInputGroup = (props) => {
  const { title, subtitle, children } = props;
  return (
    <div className="list-add__input-group">
      <h4 className="list-add__input-title">{ title }</h4>
      <h4 className="list-add__input-subtitle">{ subtitle }</h4>
      {
        children
      }
    </div>
  );
};


export default DomainAddInputGroup;
