import match from './match';

const fetchData = (page) => {
    let store = {};

    switch (page) {
        case "match":
            match();
            break;
        case "league":
            console.log(page);
            break;
        case "favorite":
            console.log(page);
            break;
        default:
            break;
    }
}

export default fetchData;