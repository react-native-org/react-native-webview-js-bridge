import { EventBus } from './lib/EventBus';

export class NativeClient {
  constructor(options) {}

  /**
   * Process event message from web client
   * @param {*} event
   */
  processMessage(event) {
    const nativeEvent = event.nativeEvent;
  }

  /**
   * Notify web client native ready.
   */
  notifyReady() {}

  /**
   * Register event handler.
   * @param {string} eventName
   * @param {function} eventHandler
   */
  when(eventName, eventHandler) {
    return this;
  }

  /**
   * Sent event to web client.
   * @param {string} eventName
   * @param {any} eventData
   */
  sendEvent(eventName, eventData) {}
}
