export interface Options {
  url?: string;
  type?: string;
  init?: any;
}

/**
 * Basic API request function
 * As the project grows and depending on the architecture
 * it could make sense to put this into a class.
 * It is promise based but at this point very general.
 * It is hard to test internal function properly.
 */
export function request(options: Options) {
  const { url, type, init } = options;


  function requestResolver(resolve: () => any, reject: () => any) {
  fetch(url, init ? {...init} : {})
      .then((response: any) => response[type]())
      .then(resolve)
      .catch(reject);
  }

  return new Promise(requestResolver);
}

/**
 * Hits /translations endpoint
 * Gets all current translations
 */
export function getTranslations() {
  return request({
    url: '/translations',
    type: 'json'
  });
}

/**
 * Hits /translation/:id endpoint
 * Gets translation status, id is job id in unbabel api
 */
export function checkStatus(jobId: string) {
  return request({
    url: `/translation/${jobId}`,
    type: 'json'
  });
}

/**
 * Hits /translate endpoint
 * Request a translation
 */
export function translate(text: string) {
  return request({
    url: '/translate',
    type: 'text',
    init: {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  });
}
