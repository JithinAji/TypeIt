export interface TypeItOptions {
  /** The target DOM element where the typing animation will be rendered */
  element: Element;
  /** Base typing speed in milliseconds per character (default: 150) */
  typingSpeed?: number;
  /** Speed variation in milliseconds for human-like random variance (default: 50) */
  speedVariation?: number;
  /** Whether the parent container automatically scrolls to bottom as text grows (default: true) */
  autoScroll?: boolean;
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
    autoScroll: boolean;
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

  events: Record<string, ((...args: any[]) => void)[]>;

  /**
   * Clears characters from the element.
   * @param options Configuration options for deletion.
   */
  clear(options?: ClearOptions): this;

  /**
   * Registers an event listener callback.
   * @param event The event name to listen to.
   * @param callback The function to execute when the event is emitted.
   */
  on(event: string, callback: (...args: any[]) => void): this;

  /**
   * Removes a specific event listener or all listeners for an event.
   * @param event The event name.
   * @param callback The specific callback to remove. If omitted, removes all callbacks for the event.
   */
  off(event: string, callback?: (...args: any[]) => void): this;

  /**
   * Emits an event to all registered listeners.
   * @param event The event name to emit.
   * @param args Arguments to pass to the callbacks.
   */
  emit(event: string, ...args: any[]): this;
}

export default TypeIt;
