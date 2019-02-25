import * as React from 'react';
import { shallow } from 'enzyme';

import { Input } from '../Input';

describe('<Input />', () => {
  describe('Snapshots', () => {
    it('should render.', () => {
      const props = {
        placeholder: 'Some text.',
        value: '',
        onChange: () => {},
        onEnter: () => {}
      };
      expect(shallow(<Input {...props} />)).toMatchSnapshot();
    });
  });
});
