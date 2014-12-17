module.exports.replace = function(context, methodName, method) {
    if (undefined != context[methodName]) {
        context[methodName] = method;
    }
};