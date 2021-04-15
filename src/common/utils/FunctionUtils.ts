/**
 * @param {function} fn original function
 * @param {number}  wait delay time before/after execute
 * @param {boolean} immediate run at start
 * @returns {function} Currying Function
 */
export const debounce: (fn: Function, wait: number, immediate?: boolean) => Function = (fn, wait, immediate = false) => {
  let timer: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    const debounceFunc = fn.bind(this, ...args);
    if (timer) clearTimeout(timer);
    if (immediate && !timer) debounceFunc();
    const calleeFunc = immediate ? () => { timer = null } : debounceFunc;
    timer = setTimeout(calleeFunc, wait);
  }
}

/**
 * @param {function} fn original function
 * @param {number}  interval interval till next time execute
 * @param {boolean} immediate run at start
 * @returns {function} Currying Function
 */
export const throttle: (fn: Function, interval: number, immediate: boolean) => Function = (fn, interval, immediate = false) => {
  let timer: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    const throttleFunc = fn.bind(this, ...args);
    if (timer) return;
    if (immediate && !timer) throttleFunc();
    timer = setTimeout(() => {
      if (!immediate) {
        throttleFunc();
      }
      timer = null;
    }, interval);
  }
}