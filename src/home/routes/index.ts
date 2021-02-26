/**
 * while BUILDING, webpack parses for `require.context` in the code 
 * - `require.context` cannot use varibles, its statically
 */

const home:string[] = [];

require.context('@/home/fragments', false, /^\..*\..*$/ ,'lazy')
  .keys()
  .forEach(key => {
    home.push(key);
  })

export const directory = {
  home,
}