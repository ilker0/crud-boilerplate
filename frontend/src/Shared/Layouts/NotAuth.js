import React from 'react';

export const NotAuthLayout = ({ component: Component, ...rest }) => {
  return (
    <div>
      <Component {...rest} />
    </div>
  );
};
