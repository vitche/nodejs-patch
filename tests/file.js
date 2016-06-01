var patch = require('../main');
module.exports = {
    testFile: function (test) {
        patch.file('./samples/first.js', './samples/merged.diff', function (error, result) {
            if (undefined != error) {
                test.ok(false, 'testFile should patch the file');
                test.done();
                return;
            }
            test.ok(result, 'testFile should change file contents');
            test.done();
        });
    }
};