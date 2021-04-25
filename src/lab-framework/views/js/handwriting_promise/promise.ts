enum STATUS {
  PENDING   = 'PENDING',
  FULFILLED = 'FULFILLED',
  REJECTED  = 'REJECTED'
}
  
class APromise<T=any> {
  status: STATUS = STATUS.PENDING;
  value: any = null;
  reason: any = null;
  onFulfulledCallbacks: any[] = [];
  onRejectedCallbacks: any[] = [];
  
  constructor(executor: (resolve: (value: T | void) => void, reject: (reason?: any) => void) => void) {
    const resolve = (val) => {
      setTimeout(() => {
        if (this.status === STATUS.PENDING) {
          this.status = STATUS.FULFILLED;
          this.value = val;
          /** 一旦不是 fulfilled 会在上面就被挡住, 不会把整个队列跑空 */
          this.onFulfulledCallbacks.forEach(next_resolve => next_resolve(this.value))
        }
      }, 0);
    }
    const reject = (res) => {
      setTimeout(() => {
        if (this.status === STATUS.PENDING) {
          this.status = STATUS.REJECTED;
          this.reason = res;
          this.onRejectedCallbacks.forEach(next_reject => next_reject(this.reason))
        }
      }, 0);
    }

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  /**
   * In Standard TypeProps Defines:
   * onFulfulled: ((value: T) => T | PromiseLike<void>) | null | undefined
   */
  then(
    onFulfulled: ((value: T) => T | APromise<T> | void),
    onRejected?: ((value: T) => T | APromise<T> | void),
  ) {
    switch (this.status) {
      // 上一个任务还在执行中, 那么把当前任务加入执行队列, 否则直接包裹并执行
      case STATUS.PENDING:
        /** 只考虑 then 返回值可能是一个 function */
        `
        return new APromise<T>(() => {
          this.onFulfulledCallbacks.push(/* 下一个任务 */ onFulfulled);
          this.onRejectedCallbacks.push(/* 下一个任务: 失败的回调 */ onRejected);  
        })
        `
        /** 考虑 then 返回值实际上可能是 ((value: T) => T | APromise<T>) | null | undefined */
        return new APromise<T>((resolve, reject) => {
          /** 下面实际是一个 executor 了, 在 PENDING 时直接将内容加入队列末尾 */
          this.onFulfulledCallbacks.push(() => {
            // 执行 then(f)
            let then_result = onFulfulled(this.value);
            then_result instanceof APromise
              // 如果执行结果是 Promise 就再次构造它,把它加到队列
              ? then_result.then(resolve, reject)
              // 否则说明这是一个简单值, 直接作为把当前 APromise 执行掉
              : resolve(then_result)
          });
          this.onRejectedCallbacks.push(() => {
            if (!onRejected) { reject(); return; }

            let then_result = onRejected(this.reason);
            then_result instanceof APromise
              ? then_result.then(resolve)
              : resolve(then_result)
          })
        })

      /** FULFILLED & REJECTED 的情况实际上更简单, 只需要根据当前流直接执行即可, 不涉及缓存的任务队列 */
      // 上一个任务已经执行完成
      case STATUS.FULFILLED:
        return new APromise<T>((resolve, reject) => {
          setTimeout(() => {
            try {
              let then_result = onFulfulled(this.value)
              then_result instanceof APromise
                ? then_result.then(resolve, reject)
                : resolve(then_result)
            } catch (err) {
              reject(err)
            }
          }, 0)
        });
      case STATUS.REJECTED:
        return new APromise<T>((resolve, reject) => {
          setTimeout(() => {
            try {
              if (!onRejected) { reject(); return; }
              let then_result = onRejected(this.value)
              then_result instanceof APromise
                ? then_result.then(resolve, reject)
                : resolve(then_result)
            } catch (err) {
              reject(err)
            }
          });
        })
    }
  }
}

export { APromise }