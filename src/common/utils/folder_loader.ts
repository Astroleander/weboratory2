const home:string[] = [];

require.context('@/home/fragments', false, /^\..*\..*$/,'lazy')
.keys()
.forEach(key => {
  home.push(key);
})

export const loadDir = {
  home
}

