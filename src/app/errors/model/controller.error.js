class ControllerError extends Error {
    constructor(message, options) {
      super(message, options);
    }
}

module.exports = { ControllerError };