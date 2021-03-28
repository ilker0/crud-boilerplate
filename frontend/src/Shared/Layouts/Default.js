import React from 'react';

export const DefaultLayout = ({ component: Component, ...rest }) => {
  return (
    <div>
      <Component {...rest} />
    </div>
  );
};
