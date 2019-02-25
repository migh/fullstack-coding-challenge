import * as React from 'react';
import { shallow } from 'enzyme';

import { App } from '../App';

describe('<App />', () => {
  describe('Snapshots', () => {
    it('should render.', () => {
      expect(shallow(<App />)).toMatchSnapshot();
    });
  });
});
