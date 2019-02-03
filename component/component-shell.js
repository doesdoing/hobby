const {
    exec
} = require('child_process');
module.exports = (cmd) => {
    exec(cmd, (error, stdout, stderr) => {
        if (stderr) {
            console.log(stderr);
        } else if (stdout) {
            console.log(stdout);
        } else if (error) {
            console.log(error);
        }
    });
};