import * as React from 'react';

import { InputContainer } from './Input.container';

export interface AppProps {}

export const App = (props: AppProps) => (
  <div id="container">
    <div className="row justify-content-md-center">
      <div className="col-12 col-lg-6 text-center">
        <h2>Test Unbabel API</h2>
        <InputContainer />
      </div>
    </div>
  </div>
);
