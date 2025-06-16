import '@testing-library/jest-dom';

// 💥 Monkeypatch für jsdom (fix für MutationObserver)
if (typeof global.MutationObserver === 'undefined') {
  global.MutationObserver = class {
    constructor(callback) {}
    disconnect() {}
    observe(element, initObject) {}
  };
}
