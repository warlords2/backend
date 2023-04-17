class ServiceError extends Error {
    constructor(message, options) {
      super(message, options);
    }
}

module.exports = { ServiceError };