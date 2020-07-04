import config from '../../config';

const leagueById = (key) => {
    const url = `${config.MAIN_URL}/competitions/?areas=${key}`;
    const result = fetch(url, {
        method: 'GET',
        headers: {
            'X-Auth-Token': config.API_AUTH
        }
    }).then(res => {
        const data = res.json();
        if (data.errorCode) return false;
        return data;
    }).catch(() => { return false })

    return result;
}

export default {
    leagueById
}