const sandbox_wrapper = document.createElement('section');
sandbox_wrapper.id = 'sandbox';
const sandbox_container = document.createElement('div');
sandbox_container.id = 'sandbox-container';
sandbox_wrapper.appendChild(sandbox_container);

let sandbox, sandboxClean = () => {}

const activeSandboxPanel = () => {
  sandbox_wrapper.className = 'active';
}
const closeSandboxPanel = () => {
  sandbox_wrapper.className = 'inactive';
}

const hashHandler = () => {
  if (!location.hash) {
    closeSandboxPanel();
  }
  import(`@/lab-framework/${location.hash.substr(2)}`)
    .then(m => {
      sandboxClean();
      if(sandbox) sandbox_container.removeChild(sandbox);

      [sandbox, sandboxClean = () => {}] = m.default;
      sandbox_container.appendChild(sandbox);
      activeSandboxPanel();
    })
    .catch(e => {
      console.error(e)
    })
}

hashHandler();
window.addEventListener('hashchange', hashHandler, false);

export default sandbox_wrapper;