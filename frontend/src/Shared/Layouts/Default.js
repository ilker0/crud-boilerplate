import React from 'react';
import { Header } from 'Shared/Components';

export const DefaultLayout = ({ component: Component, ...rest }) => {
  return (
    <div className="u-m-b-5">
      <Header routeKey={rest.routeKey} />
      <section className="container default-layout__content">
        <Component {...rest} />
      </section>
    </div>
  );
};
