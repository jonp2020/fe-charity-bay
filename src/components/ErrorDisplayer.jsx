import React from 'react';

const ErrorDisplayer = (props) => {
  return (
    <div>
      <p>
        Error. {props.msg}. {props.status}
      </p>
    </div>
  );
};

export default ErrorDisplayer;
