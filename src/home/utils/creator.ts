import * as Loader from './loader';
import { loadDir } from '@/common/utils/folder_loader';
/**
 * card - contained, independent, individual
 * | - material card @see https://material.io/components/cards
 * 
 */
export const card: (tag: string) => HTMLAnchorElement = (tag) => {
  const card = document.createElement('a');
  card.id = `${tag}-card`;
  card.className = 'fragment-card';
  card.href = tag === 'home' ? '' : tag;
  card.innerHTML = tag;

  card.append(media(tag));
  card.append(title(tag));
  return card;
}

export const media = (tag) => {
  const container = document.createElement('div');
  container.classList.add('media');

  tryLoadFragment(container, tag);
  return container;
}

export const title = (tag) => {
  const container = document.createElement('div');
  container.classList.add('title');
  return container;
}

/**
 * @param tag 
 */
function tryLoadFragment(container:HTMLDivElement ,tag:string) {
  /** tag (nav title) -> fragment name */
  let fragment_name = tag.replace(/(lab-)(.*)/, (_, lab, name) => `fragmentLab${name.charAt(0).toUpperCase() + name.slice(1)}`)
  
  /** fragment name -> file name */
  const file_name = loadDir.home.find(str => str.includes(fragment_name));
  
  /** try to get loader */
  const loader = Loader.selectedLoader(file_name);
  
  if (loader && file_name) {
    const { rule: _, loader: load } = loader;
    import('@/home/fragments/' + file_name.slice(2)).then(m => {
      const module = m.default;
      const component = load(module);
      container.appendChild(component)
    })
  }
}