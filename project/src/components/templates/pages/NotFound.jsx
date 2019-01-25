import React from 'react';
import { Helmet } from 'react-helmet';

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Not Found 404</title>
        </Helmet>
        <h1>Not Found 404!</h1>
      </div>
    );
  }
}

export default NotFound;
