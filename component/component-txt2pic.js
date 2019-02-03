const fs = require('fs');
const text2png = require('text2png');
module.exports = (a, b) => {
    fs.writeFileSync(a, text2png(b, {
        color: 'white',
        backgroundColor: 'black',
        padding: 10,
        font: '30px sans-serif',
        textAlign: 'left',
        lineSpacing: 10,
        letterSpacing: 2
    }));
};