import { EventBus } from './lib/EventBus';

export class WebClient {
  constructor() {
    this.nativeIsReady = false; // Mark the native is ready.
    this._init();
  }

  _init() {}

  /**
   * Register event handler.
   * @param {string} eventName
   * @param {function} eventHandler
   */
  when(eventName, eventHandler) {
    return this;
  }

  /**
   * Sent event to native client.
   * @param {string} eventName
   * @param {any} eventData
   */
  sendEvent(eventName, eventData) {}
}
