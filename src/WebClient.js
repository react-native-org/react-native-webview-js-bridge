import { EventBus, util } from './lib';

const defaults = {
  timeout: 5000 // 5000 ms
};

export class WebClient {
  constructor() {
    // Prepare properties
    this.nativeIsReady = false; // Mark the native is ready.
    this.eventBus = new EventBus();
    // Init
    this._init();
  }

  _init() {
    window.document.addEventListener('message', evt => this._processMessage(evt));
  }

  _processMessage(evt) {
    const msgEntity = this._getMessageEntity(evt);
  }

  _getMessageEntity(evt) {
    return {};
  }

  /**
   * Register event handler.
   * @param {string} eventName
   * @param {function} eventHandler
   */
  when(eventName, eventHandler) {
    util.registerEvent(this.eventBus, eventName, eventHandler);
    return this;
  }

  _buildMessageEntity(eventName, eventData) {
    return {};
  }

  /**
   * Sent event to native client.
   * @param {string} eventName
   * @param {any} eventData
   */
  sendEvent(eventName, eventData) {
    if (!eventName) {
      throw new Error(`Empty event name.`);
    }

    // Build and send message.
    const msgEntity = this._buildMessageEntity(eventName, eventData);
    const msgStr = JSON.stringify(msgEntity);
    window.postMessage(msgStr, '*');

    // Receive response.
    return new Promise((resolve, reject) => {
      // If timeout, remove listners
      let timerId = setTimeout(() => {
        this.eventBus.removeAllListeners(msgEntity.msgId);
        reject({ result: false, error: 'timeout' });
      }, this.options.timeout);
      // If reveive response, clear timeout.
      this.eventBus.once(msgEntity.msgId, event => {
        clearTimeout(timerId);
        resolve({ result: true });
      });
    });
  }
}
