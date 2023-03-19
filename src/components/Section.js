class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(items) {
    this._container.innerHTML = '';
    items.forEach(item => this._renderer(item));
  }
}

export default Section;