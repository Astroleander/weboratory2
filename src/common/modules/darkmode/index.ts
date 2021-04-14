import { TOKEN_THEME as THEME } from '@/common/utils/TokenUtil';

export { THEME }

/**
 * 1. try to initial THEME from <code>localStorage</code>
 * 2. set <code>html.dataset.theme</code>
 */
export const initTheme:() => void = () => {
  const theme = localStorage.getItem(THEME);
  const root = document.querySelector('html');
  if (!root) {
    console.error('[INIT ERROR] can not find <html> tag. ');
    return;
  };
  if (theme) {
    root.dataset.theme = theme;
  } else {
    root.dataset.theme = 'theme-light';
  }
};

/**
 * toggle theme/mode
 * @returns current value
 */
export const toggle:() => string = () => {
  const html = document.querySelector('html')
  const theme = html?.dataset.theme;
  let value;
  if (!html) return;

  if (theme === null || undefined) {

  } else if (theme === 'theme-light') {
    value = 'theme-dark';
  } else {
    value = 'theme-light';
  }
  html.dataset.theme = value;
  localStorage.setItem(THEME, value);
  return value;
}