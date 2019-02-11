import * as React from 'react';

export interface AppProps { children: any; }

export const App = (props: AppProps) => (
  <div>
    {props.children}
  </div>
);
