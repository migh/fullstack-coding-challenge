import * as React from 'react';

export interface InputProps {
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  onEnter: (event: React.FormEvent<HTMLInputElement>) => void;
  placeholder: string;
  value: string;
}

export const Input = (props: InputProps) => (
    <input
      className="form-control"
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      onKeyPress={props.onEnter}
    />
);

