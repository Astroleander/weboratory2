export const deepClone: (x:any) => typeof x  = obj => {
  if (obj === null) return null;
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(key =>
    (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  )

  // Object.prototype.toString.call(obj) === '[object Array]'
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone);
  }

  return clone;
}