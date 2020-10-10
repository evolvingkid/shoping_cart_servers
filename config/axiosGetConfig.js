const config = require('config');

const username = config.get('external-server-username');
const password = config.get('external-server-password');

function axiosGetconfig(params) {

    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');

    const config = {
        method: 'get',
        url: `https://api.ssactivewear.com/v2/${params.url}`,
        headers: { 'Authorization': `Basic ${token}` }
    };

    return config;
}

module.exports = axiosGetconfig;