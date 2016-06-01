var fs = require('fs');
var diff = require('diff');
module.exports = {
    replace: function (context, methodName, method) {
        if (undefined != context[methodName]) {
            context[methodName] = method;
        }
    },
    append: function (context, methodName, method) {
        if (undefined == context[methodName]) {
            context[methodName] = method;
        }
    },
    file: function (file, patchFile, callback) {
        // Read the file
        fs.readFile(file, 'utf8', function (error, fileData) {
            if (error) {
                callback(error);
                return;
            }
            // Read the patch
            fs.readFile(patchFile, 'utf8', function (error, patchData) {
                if (error) {
                    callback(error);
                    return;
                }
                // Parse the patch rule
                var parsedPatch = diff.parsePatch(patchData);
                // Apply the patch
                var patchedFile = diff.applyPatch(fileData, parsedPatch);
                if (!patchedFile) {
                    callback(undefined, false);
                    return;
                }
                // Save the patch
                fs.writeFile(file, patchedFile, function (error) {
                    if (error) {
                        callback(error);
                        return;
                    }
                    callback(undefined, true);
                });
            });
        });
    }
};