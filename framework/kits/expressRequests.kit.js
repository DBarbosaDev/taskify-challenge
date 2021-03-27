const getRequesterIp = (expressRequest) => {
    return expressRequest.headers['x-forwarded-for'] || expressRequest.connection.remoteAddress
        || expressRequest.socket.remoteAddress || (expressRequest.connection.socket ? expressRequest.connection.socket.remoteAddress : null);
};

const getBearerToken = (expressRequest) => {
    if (expressRequest.headers.authorization && expressRequest.headers.authorization.split(' ')[0] === 'Bearer') {
        return expressRequest.headers.authorization.split(' ')[1];
    }

    return null;
};

module.exports = {
    getRequesterIp,
    getBearerToken
};
