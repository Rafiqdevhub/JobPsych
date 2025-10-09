// Global setup that runs before JSDOM initializes
// This prevents webidl-conversions errors in CI environments
/* eslint-disable no-undef */

export default function setup() {
  // Ensure global object exists
  if (typeof global !== "undefined" && !global.WeakMap) {
    global.WeakMap = WeakMap;
  }

  // Polyfill WeakMap.prototype if needed (for webidl-conversions)
  if (typeof WeakMap !== "undefined" && WeakMap.prototype) {
    // Ensure the prototype has the required methods
    if (!WeakMap.prototype.get) {
      WeakMap.prototype.get = function (_key) {
        // Basic implementation - won't be used in practice
        return undefined;
      };
    }
    if (!WeakMap.prototype.set) {
      WeakMap.prototype.set = function (_key, _value) {
        // Basic implementation - won't be used in practice
        return this;
      };
    }
    if (!WeakMap.prototype.has) {
      WeakMap.prototype.has = function (_key) {
        // Basic implementation - won't be used in practice
        return false;
      };
    }
  }

  return () => {
    // Teardown function (optional)
  };
}
