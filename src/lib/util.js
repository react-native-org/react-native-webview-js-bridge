export const util = {
  isFunction(fn) {
    return typeof fn === 'function';
  },

  /**
   * Build message unique ID
   */
  buildMessageId() {},

  /**
   * Register event
   * @param {*} eventBus
   * @param {*} eventName
   * @param {*} eventHandler
   */
  registerEvent(eventBus, eventName, eventHandler) {
    if (!eventName) {
      throw new Error(`Empty event name.`);
    }
    if (!util.isFunction(eventHandler)) {
      throw new TypeError(`Event handler must be a function.`);
    }
    if (eventBus.listenerCount(eventName) > 0) {
      throw new Error(`Event name ${eventName} registered.`);
    }
    eventBus.on(eventName, eventHandler);
  }
};
