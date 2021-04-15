import { debounce } from '@/common/utils/FunctionUtils';
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
export const toggle: () => string = () => {
  const html = document.querySelector('html')
  let value;

  if (!html) return;
  const theme = html.dataset.theme;
  handleOnSwitchTag(html);

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

let removeClassLater;

const handleOnSwitchTag: (root: HTMLHtmlElement) => void = (root) => {
  const class_token = 'on-theme-switching';
  removeClassLater ??= debounce(() => {
    root.classList.remove(class_token)
  }, 1200);

  root.classList.add(class_token);
  removeClassLater();
}