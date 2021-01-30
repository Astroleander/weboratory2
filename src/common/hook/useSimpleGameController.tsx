import { useEffect, useReducer, useCallback } from 'react';

const DIERECTIONS = ['left', 'right', 'up', 'down'];

const initCallbacks = () => {
  const callbacks = {};
  DIERECTIONS.forEach(d => {
    callbacks[d] = v => console.warn(`pressdown "${v}", but no controller found`);
  })
  return callbacks;
}

const callbackReducer = (state, action) => {
  return {
    ...state,
    [action.direction]: action.callback,
  }
}

const useSimpleGameController = () => {
  const [callbacks, dispatch] = useReducer(callbackReducer, {}, initCallbacks);

  useEffect(() => {
    const handler = ({ keyCode }) => {
      switch (keyCode) {
        case 38: /** ↑ */
        case 87: /** w */
          callbacks['up'](keyCode);
          break;
        case 40: /** ↓ */
        case 83: /** s */
          callbacks['down'](keyCode);
          break;
        case 37: /** ← */
        case 65: /** a */
          callbacks['left'](keyCode);
          break;
        case 39: /** → */
        case 68: /** d */
          callbacks['right'](keyCode);
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [ callbacks ]);

  const setter = (direction, callback) => {
    dispatch({
      direction: direction,
      callback: callback,
    });
  };

  return [
    f => setter('left', f), 
    f => setter('right', f), 
    f => setter('up', f), 
    f => setter('down', f), 
  ];
}

export { useSimpleGameController };