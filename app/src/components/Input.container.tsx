import * as React from 'react';

import { Input } from './Input';

export interface InputState {
  text: string;
}

export class InputContainer extends React.Component {
  state: InputState = {
    text: ''
  };

  clickHandler() {
    console.log('Clicked');
  }

  enterHandler = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if(ev.key === 'Enter') {
      this.clickHandler();
    }
  }

  changeHandler = (ev: React.FormEvent<HTMLInputElement>) => {
    this.setState({ text: ev.currentTarget.value });
  }

  render() {
    return (
      <div className="card">
        <div className="form-group">
          <Input
            placeholder="Write some text to translate"
            onChange={this.changeHandler}
            onEnter={this.enterHandler}
            value={this.state.text}
          />
          <button type="button" className="btn btn-primary my-2" onClick={this.clickHandler}>
            Translate
          </button>
          <div className="row justify-content-md-center">
            <div className="col-10">
              <ul className="list-group">
                <li className="list-group-item list-group-item-primary">
                  Prev results
                  <span className="float-right">status</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
