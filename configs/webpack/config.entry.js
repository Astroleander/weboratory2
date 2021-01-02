/** fine, ES5 annoy me finally*/

const entriesList = [];

/**
 * @param {string} dirname dir to parse
 * @returns {import("webpack").Entry}
 */
const entryFactory = (dirname, dependOn = undefined) => {
  return {
    import: [`./src/${dirname}/index`],
    dependOn: dependOn
  }
}

module.exports = {
  entryFactory: entryFactory,
  entriesList
}