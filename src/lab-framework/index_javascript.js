import NavLayout from '@/common/layouts/NavLayout.ts';
import { js_routes } from './routes';

const archor = [];

const createTitle = () => {
  const title = document.createElement('h1');
  title.innerHTML = 'JS Section';
  return title;
}

const createRouter = () => {
  return NavLayout(js_routes);
}

archor.push(
  createTitle(),
  createRouter()
);

export default archor;