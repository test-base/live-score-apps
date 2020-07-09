import match from './match';
import league from './league';

const fetchData = (page) => {
    switch (page) {
        case "match":
            match();
            break;
        case "league":
            league();
            break;
        case "favorite":
            break;
        default:
            break;
    }
}

export default fetchData;