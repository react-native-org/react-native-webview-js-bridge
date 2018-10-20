import { EventBus, util } from './lib';

const noop = function() {};

const defaults = {
  timeout: 5000 // 5000 ms
};

export class NativeClient {
  constructor(options) {
    this.options = Object.assign({}, defaults, options);
    this.eventBus = new EventBus();
  }

  _getWebview() {
    let webview;
    if (util.isFunction(this.options.getWebview)) {
      webview = this.options.getWebview();
    } else {
      webview = this.options.webview;
    }
    if (!webview) {
      throw new Error(`Webview can't be null.`);
    }
    return webview;
  }

  /**
   * Process event message from web client
   * @param {*} event
   */
  processMessage(event) {
    const nativeEvent = event.nativeEvent;
    const msgEntity = this._getMessageEntity(nativeEvent);
    // Check message entity valid
  }

  _getMessageEntity(nativeEvent) {
    return {};
  }

  /**
   * Notify web client native ready.
   */
  notifyReady() {
    this.sendEvent('$ready$');
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
   * Sent event to web client.
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
    this._getWebview().postMessage(msgStr);

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
