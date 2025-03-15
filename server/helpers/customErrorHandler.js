class customErrorHandler extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static alreadyExists(message) {
        return new customErrorHandler(409, message);
    }
}

export default customErrorHandler;