const getRequesterIp = (expressRequest) => {
    return expressRequest.headers['x-forwarded-for'] || expressRequest.connection.remoteAddress
        || expressRequest.socket.remoteAddress || (expressRequest.connection.socket ? expressRequest.connection.socket.remoteAddress : null);
};

module.exports = {
    getRequesterIp
};
