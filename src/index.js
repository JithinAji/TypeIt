"use strict"

const TypeIt = function (data) {
  this.settings = {};
  if (data instanceof Element) {
    this.settings.element = data;
    this.settings.typingSpeed = 150;
    this.settings.speedVariation = 50;
    this.settings.autoScroll = true;
  }
  else {
    this.settings.element = data.element;
    this.settings.typingSpeed = data.typingSpeed ?? 150;
    this.settings.speedVariation = data.speedVariation ?? 50;
    this.settings.autoScroll = data.autoScroll ?? true;
  }

  if (!(this.settings.element instanceof Element)) {
    throw new Error("Initialize with an html element")
  }

  this.timer = null;
  this.queue = [];
  this.isTyping = false;

  this.events = {};
  this.observer = null;
}

TypeIt.prototype.type = function (content) {
  this.queue.push(content);

  if (!this.isTyping) {
    this.next();
  }

  return this;
}


TypeIt.prototype.next = function () {
  if (this.queue.length === 0) {
    this.isTyping = false;
    this.emit("complete");

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    return;
  }

  this.isTyping = true;

  var content = this.queue.shift();
  var settings = this.settings;
  var element = settings.element;
  var parentElement = element.parentElement || null;

  if (settings.autoScroll && parentElement) {
    if (this.observer) {
      this.observer.disconnect();
    }

    if (typeof MutationObserver !== "undefined") {
      this.observer = new MutationObserver(scrollToBottom);
      this.observer.observe(element, {
        childList: true,
        characterData: true,
        subtree: true
      });
    }

    var scrollToBottom = function () {
      if (typeof element.scrollIntoView === "function") {
        element.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      } else if (parentElement.scrollTo) {
        parentElement.scrollTo({
          top: parentElement.scrollHeight,
          behavior: "smooth",
        });
      } else {
        parentElement.scrollTop = parentElement.scrollHeight;
      }
    };
  }

  var index = 0;

  const addContent = () => {
    if (index >= content.length) {
      this.next();
      return;
    }

    element.textContent += content[index];
    index++;

    var variation = (Math.random() * 2 - 1) * settings.speedVariation;

    var delay = Math.max(0, settings.typingSpeed + variation);

    this.timer = setTimeout(addContent, delay);

  }

  addContent();
  return this;
}

TypeIt.prototype.setTypingSpeed = function (speed) {
  if (typeof speed == "number") {
    this.settings.typingSpeed = speed;
  }
  return this;
}

TypeIt.prototype.setVariationSpeed = function (speed) {
  if (typeof speed == "number") {
    this.settings.speedVariation = speed;
  }
  return this;
}

TypeIt.prototype.clear = function (options = {}) {
  var settings = this.settings;
  var element = settings.element;

  var animated = options.animated ?? true;
  var count = Math.max(
    0,
    Math.floor(options.count ?? element.textContent.length)
  )

  if (count <= 0) {
    return this;
  }

  clearTimeout(this.timer);
  this.timer = null;

  if (this.observer) {
    this.observer.disconnect();
    this.observer = null;
  }

  this.queue = [];
  this.isTyping = false;

  if (!animated) {
    element.textContent = Array.from(element.textContent)
      .slice(0, -count)
      .join("");

    this.emit("clear");

    return this;
  }

  var deleted = 0;

  function removeContent() {
    if (deleted >= count || !element.textContent.length) {
      this.timer = null;
      this.isTyping = false;

      this.emit("clear");

      return;
    }

    element.textContent = Array.from(element.textContent)
      .slice(0, -1)
      .join("");

    deleted++;

    var variation = (Math.random() * 2 - 1) * settings.speedVariation;

    var delay = Math.max(0, settings.typingSpeed + variation);

    this.timer = setTimeout(removeContent, delay);
  }

  this.isTyping = true;
  removeContent();

  return this;
}

TypeIt.prototype.on = function (event, callback) {
  if (typeof callback !== "function") {
    return this;
  }

  if (!this.events[event]) {
    this.events[event] = [];
  }

  this.events[event].push(callback);

  return this;
}

TypeIt.prototype.off = function (event, callback) {
  if (!this.events[event]) {
    return this;
  }

  if (typeof callback === "function") {
    this.events[event] = this.events[event].filter(function (cb) {
      return cb !== callback;
    });
  } else {
    delete this.events[event];
  }

  return this;
}

TypeIt.prototype.emit = function (event, ...args) {
  const callbacks = this.events[event];

  if (!callbacks || callbacks.length === 0) {
    return this;
  }

  callbacks.slice().forEach(function (callback) {
    callback.apply(this, args);
  }, this);

  return this;
}

export default TypeIt;
