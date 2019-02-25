import * as React from 'react';

import * as api from '../services/api';
import { Input } from './Input';
import { TranslationsList } from './TranslationsList';

export interface Translation {
  id: number;
  textSource: string;
  textTarget: string;
  jobId: string;
  status: string;
}

export interface InputState {
  text: string;
  translations: Translation[];
  isLoaded: boolean;
  requestingTranslation: boolean;
}

export class InputContainer extends React.Component {
  state: InputState = {
    text: '',
    translations: [],
    isLoaded: false,
    requestingTranslation: false
  };

  /**
   * React lifecycle method
   */
  componentDidMount() {
    this.updateTranslations();
  }

  /**
   * Updates translation status
   */
  updateTranslations() {
    api.getTranslations().then(translations => {
      this.setState({
        isLoaded: true,
        translations: translations as Translation[]
      });
    });
  }

  /**
   * Makes a translate request to API
   */
  translateClickHandler = () => {
    const { text } = this.state;

    this.setState({
      requestingTranslation: true
    });

    api.translate(text).then(data => {
      this.setState({
        requestingTranslation: false
      });

      this.updateTranslations();
    });
  }

  /**
   * A handler generator for item click and status update
   */
  itemClickPartialHandler = (item: Translation) => () => {
    api.checkStatus(item.jobId).then(({ updated }) => {
      if (updated) {
        this.updateTranslations();
      }
    });
  }

  /**
   * Handle enter button translate trigger
   */
  enterHandler = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if(ev.key === 'Enter') {
      this.translateClickHandler();
    }
  }

  /**
   * Handle input's value change
   */
  changeHandler = (ev: React.FormEvent<HTMLInputElement>) => {
    this.setState({ text: ev.currentTarget.value });
  }

  /**
   * Renders Input Container
   */
  render() {
    const { text, isLoaded, translations, requestingTranslation } = this.state;

    return (
      <div className="card">
        <div className="form-group">
          <Input
            placeholder="Write some text to translate"
            onChange={this.changeHandler}
            onEnter={this.enterHandler}
            value={text}
          />
          <button type="button" className="btn btn-primary my-2" onClick={this.translateClickHandler}>
            Translate
          </button>
          { requestingTranslation && <h2 className="my-2">Requesting translation...</h2>}
          <TranslationsList
            isLoaded={isLoaded}
            translations={translations}
            onItemClick={this.itemClickPartialHandler}
          />
          <p><strong>Note</strong>: Click on the item to update status.</p>
        </div>
      </div>
    );
  }
}
