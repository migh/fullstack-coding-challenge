import * as React from 'react';
import { Translation } from './Input.container';

// I know lodash have a function for this
function capitalize(str: string): string {
  return str.slice(0,1).toUpperCase() + str.slice(1);
}

// Orders the longer string first
function orderByLength(a: Translation, b: Translation): number {
  const aLength = a.textTarget && a.textTarget.length || 0;
  const bLength = b.textTarget && b.textTarget.length || 0;
  return bLength - aLength;
}

// I know classnames could work for this
function getClass(status: string): string {
  switch(status) {
    case 'requested':
      return 'list-group-item-success';
    case 'pending':
      return 'list-group-item-warning';
    case 'completed':
      return 'list-group-item-primary';
  }
}

export interface TranslationsListProps {
  isLoaded: boolean;
  translations: Translation[];
  onItemClick: (item: Translation) => () => void;
}

export const TranslationsList = (props: TranslationsListProps) => (
    <div className="row justify-content-md-center">
      <div className="col-10">
        <ul className="list-group">
          {props.translations.sort(orderByLength).map(translation => (
            <li
              key={translation.id}
              className={`list-group-item mb-1 ${getClass(translation.status)}`}
              style={{ cursor: 'pointer' }}
              onClick={props.onItemClick(translation)}
            >
              {translation.textSource}
              <span className="float-right">{capitalize(translation.status)}</span>
              {translation.status === 'completed' && (
                <React.Fragment>
                  <hr />
                  <div>{translation.textTarget}</div>
                </React.Fragment>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
);

