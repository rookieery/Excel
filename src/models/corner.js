import cornerHandler from '../views/cornerView.js';

export default function createCorner() {
  const corner = document.createElement('th');
  corner.classList.add('corner');
  corner.innerText = '/';
  corner.addEventListener('click', cornerHandler, false);
  return corner;
}
