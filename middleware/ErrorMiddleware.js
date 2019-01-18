const ErrorMiddleware = (err, req, res, next) => {
    res.send(err.error).status(err.status || 500);
}

export default ErrorMiddleware;