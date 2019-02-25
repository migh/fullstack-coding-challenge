import * as React from 'react';
import { shallow } from 'enzyme';

import { Translation } from '../Input.container';
import { TranslationsList } from '../TranslationsList';

describe('<TranslationsList />', () => {
  describe('Snapshots', () => {
    it('should render.', () => {
      const props = {
        isLoaded: true,
        translations: [
          {
            id: 1,
            jobId: '34234',
            textSource: 'Uno',
            textTarget: 'One',
            status: 'completed'
          },
          {
            id: 2,
            jobId: 'dfsgs3',
            textSource: 'Two',
            textTarget: 'Dos',
            status: 'pending'
          }
        ] as Translation[],
        onItemClick: () => () => {}
      };
      expect(shallow(<TranslationsList {...props} />)).toMatchSnapshot();
    });
  });
});
