import styles from './index.modules.less';

/** 这里实际上是初始化时会直接调用的一部分, 整个页面始终存在于 framework 页面, 因此直接用单例初始化也没啥问题 */

const sandbox_wrapper = document.createElement('section');
sandbox_wrapper.id = 'sandbox';
sandbox_wrapper.className = styles['sandbox-wrapper'];

// default binder
let bindSandbox = () => { }, clearSandbox = () => { }

// instance
let sandbox;

const activeSandboxPanel = () => {
  sandbox_wrapper.classList.add(styles['active']);
  sandbox_wrapper.classList.remove(styles['inactive']);
}

const closeSandboxPanel = () => {
  sandbox_wrapper.classList.remove(styles['active']);
  sandbox_wrapper.classList.add(styles['inactive']);
}

const hashHandler = () => {
  clearSandbox();
  if (!location.hash) {
    closeSandboxPanel();
  } else {
    import(`@/lab-framework/${location.hash.substr(2)}`)
    .then(m => {
      if(sandbox) sandbox_wrapper.removeChild(sandbox);

      [bindSandbox, clearSandbox = () => { }] = m.default;
      sandbox = bindSandbox();
      sandbox_wrapper.appendChild(sandbox);
      activeSandboxPanel();
    })
    .catch(e => {
      console.error(e)
    })
  }
}

hashHandler();
window.addEventListener('hashchange', hashHandler, false);

export default sandbox_wrapper;