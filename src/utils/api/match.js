import match from './fetch/match';

const matchPage = () => {
    match.matchToday().then(data => {
        if (!data) return 'error';
        console.log(data) ;
    });

    match.matchTomorrow().then(data => {
        if (!data) return 'error';
        console.log(data);
    })
}

export default matchPage;