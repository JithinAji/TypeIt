"use strict";
var TypeIt = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.js
  var index_exports = {};
  __export(index_exports, {
    default: () => index_default
  });
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
    this.events = {};
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
      this.emit("complete");
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
      this.emit("clear");
      return this;
    }
    let deleted = 0;
    const removeContent = () => {
      if (deleted >= count || !element.textContent.length) {
        this.timer = null;
        this.isTyping = false;
        this.emit("clear");
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
  TypeIt.prototype.on = function(event, callback) {
    if (typeof callback !== "function") {
      return this;
    }
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    return this;
  };
  TypeIt.prototype.off = function(event, callback) {
    if (!this.events[event]) {
      return this;
    }
    if (typeof callback === "function") {
      this.events[event] = this.events[event].filter(function(cb) {
        return cb !== callback;
      });
    } else {
      delete this.events[event];
    }
    return this;
  };
  TypeIt.prototype.emit = function(event, ...args) {
    const callbacks = this.events[event];
    if (!callbacks || callbacks.length === 0) {
      return this;
    }
    callbacks.slice().forEach(function(callback) {
      callback.apply(this, args);
    }, this);
    return this;
  };
  var index_default = TypeIt;
  return __toCommonJS(index_exports);
})();
if (typeof TypeIt !== "undefined" && TypeIt.default) TypeIt = TypeIt.default;
//# sourceMappingURL=index.global.js.map
