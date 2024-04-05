function logger(req, res, next) {
    console.log("Loggin ...");
    next();
}

export default logger;