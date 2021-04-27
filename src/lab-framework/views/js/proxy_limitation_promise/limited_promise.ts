let max_limited = 10;
let executeSet = new Set();
let waitingQueue:(() => Promise<any>)[] = [];
export const LimitPromise = (executor, max_modified?) => {
  if (max_modified) max_limited = max_modified;

  return new Promise((resolve, reject) => {
    // 构造 wrapper, 不执行的 promise 不能初始化
    const wrapper = () => new Promise(executor).then(result => {
      // 原 promise 执行完以后应当检查 waitingQueue, 如果不为空则取出一个, 构造 promise
      executeSet.delete(wrapper)
      if (waitingQueue.length) {
        const next = waitingQueue.shift();
        next && next();
      }
      resolve(result)
    })
    // 如果 executeSet is full, add task to queue
    if (executeSet.size >= max_limited) { waitingQueue.push(wrapper); }
    else {
      // 如果 excuteSet is not full, 构造原 promise
      executeSet.add(wrapper)
      return wrapper();
    }
  })
}
