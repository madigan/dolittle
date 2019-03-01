const app = require('./server');

const PORT = process.env.PORT||3000;
const APP_NAME = `🐘`;

app.listen(PORT, error => {
    if(error) {
        console.error(APP_NAME, error);
        process.exit(1);
    } else {
        console.log(APP_NAME, `Running on port ${PORT}`);
    }
});