export function setHeadsOne(index, heads) {
  for (let i = 0; i < heads.length; i++) {
    if (heads[i].classList.contains('active')) {
      heads[i].classList.remove('active');
    }
    if (heads[i].innerText === index) {
      heads[i].classList.add('active');
    }
    heads[i].classList.remove('selected');
  }
}

export function setHeadsTwo(heads) {
  for (let i = 0; i < heads.length; i++) {
    heads[i].classList.add('selected');
    if (heads[i].classList.contains('active')) {
      heads[i].classList.remove('active');
    }
    heads[i].classList.add('selected');
  }
}
