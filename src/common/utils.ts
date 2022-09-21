export function toPromise<T>(callback) {
  return (...args): Promise<T> => {
    return new Promise((resolve) => {
      callback(...args, resolve);
    });
  };
}

/**
 * Helper for copying text to system clipboard.
 */
export function copy(text: string) {
  const input = document.createElement('textarea');
  input.innerHTML = text;
  document.body.appendChild(input);
  input.select();
  const result = document.execCommand('copy');
  document.body.removeChild(input);
  return result;
}
