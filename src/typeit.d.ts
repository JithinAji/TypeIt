export interface TypeItOptions {
  /** The target DOM element where the typing animation will be rendered */
  element: Element;
  /** Base typing speed in milliseconds per character (default: 150) */
  typingSpeed?: number;
  /** Speed variation in milliseconds for human-like random variance (default: 50) */
  speedVariation?: number;
}

export interface ClearOptions {
  /** Number of characters to delete. Defaults to the entire text length. */
  count?: number;
  /** Whether the deletion should be animated (default: true). Set false for instant clear. */
  animated?: boolean;
}

export class TypeIt {
  /**
   * Initializes a new TypeIt instance.
   * @param data Either a DOM Element or an options configuration object.
   */
  constructor(data: Element | TypeItOptions);

  settings: {
    element: Element;
    typingSpeed: number;
    speedVariation: number;
  };
  timer: ReturnType<typeof setTimeout> | null;
  queue: string[];
  isTyping: boolean;

  /**
   * Queues a string to be typed into the element.
   * @param content The text string to type.
   */
  type(content: string): this;

  /**
   * Processes the next item in the typing queue.
   */
  next(): this;

  /**
   * Dynamically updates the base typing speed.
   * @param speed Speed in milliseconds per character.
   */
  setTypingSpeed(speed: number): this;

  /**
   * Dynamically updates the speed variation range.
   * @param speed Variation range in milliseconds.
   */
  setVariationSpeed(speed: number): this;

  /**
   * Clears characters from the element.
   * @param options Configuration options for deletion.
   */
  clear(options?: ClearOptions): this;
}

declare global {
  interface Window {
    TypeIt: typeof TypeIt;
  }
}

export default TypeIt;
