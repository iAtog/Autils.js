class LibraryUnknowError extends Error {
    constructor(message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.status = 500;
    }

    statusCode() {
        return this.status;
    }

}

module.exports = LibraryUnknowError;