import * as create from './utils/creator';
import './index.css';

const root = document.getElementById('root');
ENTRIES.forEach(entry => {
  if (entry === 'home') return;

  const card = create.card(entry);
  root && root.append(card);
});