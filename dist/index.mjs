// src/index.js
var TypeIt = function(data) {
  this.settings = {};
  if (data instanceof Element) {
    this.settings.element = data;
    this.settings.typingSpeed = 150;
    this.settings.speedVariation = 50;
  } else {
    this.settings.element = data.element;
    this.settings.typingSpeed = data.typingSpeed ?? 150;
    this.settings.speedVariation = data.speedVariation ?? 50;
  }
  this.timer = null;
  this.queue = [];
  this.isTyping = false;
};
TypeIt.prototype.type = function(content) {
  this.queue.push(content);
  if (!this.isTyping) {
    this.next();
  }
  return this;
};
TypeIt.prototype.next = function() {
  if (this.queue.length === 0) {
    this.isTyping = false;
    return;
  }
  this.isTyping = true;
  const content = this.queue.shift();
  const settings = this.settings;
  const element = settings.element;
  let index = 0;
  const addContent = () => {
    if (index >= content.length) {
      this.next();
      return;
    }
    element.textContent += content[index];
    index++;
    const variation = (Math.random() * 2 - 1) * settings.speedVariation;
    const delay = Math.max(0, settings.typingSpeed + variation);
    this.timer = setTimeout(addContent, delay);
  };
  addContent();
  return this;
};
TypeIt.prototype.setTypingSpeed = function(speed) {
  if (typeof speed == "number") {
    this.settings.typingSpeed = speed;
  }
  return this;
};
TypeIt.prototype.setVariationSpeed = function(speed) {
  if (typeof speed == "number") {
    this.settings.speedVariation = speed;
  }
  return this;
};
TypeIt.prototype.clear = function(options = {}) {
  const settings = this.settings;
  const element = settings.element;
  const animated = options.animated ?? true;
  const count = Math.max(
    0,
    Math.floor(options.count ?? element.textContent.length)
  );
  if (count <= 0) {
    return this;
  }
  clearTimeout(this.timer);
  this.timer = null;
  this.queue = [];
  this.isTyping = false;
  if (!animated) {
    element.textContent = Array.from(element.textContent).slice(0, -count).join("");
    return this;
  }
  let deleted = 0;
  const removeContent = () => {
    if (deleted >= count || !element.textContent.length) {
      this.timer = null;
      this.isTyping = false;
      return;
    }
    element.textContent = Array.from(element.textContent).slice(0, -1).join("");
    deleted++;
    const variation = (Math.random() * 2 - 1) * settings.speedVariation;
    const delay = Math.max(0, settings.typingSpeed + variation);
    this.timer = setTimeout(removeContent, delay);
  };
  this.isTyping = true;
  removeContent();
  return this;
};
var index_default = TypeIt;
export {
  index_default as default
};
//# sourceMappingURL=index.mjs.map
