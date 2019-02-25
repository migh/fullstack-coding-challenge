import * as React from 'react';
import { shallow } from 'enzyme';

import * as api from '../../services/api';
import { InputContainer } from '../Input.container';

jest.mock('../../services/api', () => ({
  getTranslations: jest.fn(() => Promise.resolve([])),
  translate: jest.fn(() => Promise.resolve({})),
  checkStatus: jest.fn(() => Promise.resolve({}))
}));

describe('<InputContainer />', () => {
  describe('Snapshots', () => {
    it('should render.', () => {
      expect(shallow(<InputContainer />)).toMatchSnapshot();
    });
  });

  describe('updateTranslations()', () => {
    it('should call api.getTranslations.', () => {
      const wrapper = shallow(<InputContainer />);
      const instance = (wrapper.instance() as InputContainer);

      instance.updateTranslations();

      expect(api.getTranslations).toHaveBeenCalled();
    });
  });

  describe('translateClickHandler()', () => {
    it('should call api.translate.', () => {
      const wrapper = shallow(<InputContainer />);
      const instance = (wrapper.instance() as InputContainer);

      instance.translateClickHandler();

      expect(api.translate).toHaveBeenCalled();
    });
  });
});
