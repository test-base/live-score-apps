import element from '../config/element';
import date from '../config/date';
import match from './fetch/match';

let store = {
    today: [],
    tomorrow: []
};

const matchPage = () => {
    if (!store.today.length) {
        match.matchToday().then(res => {
            if (!res) {
                element.addAlert('.match__today');
                return '';
            }
            const datas = res.matches;
            store.today.push(datas);
            renderMatch(datas, '.match__today');
        });
    } else {
        const datas = store.today[0];
        renderMatch(datas, '.match__today');
    }

    if (!store.today.length) {
        match.matchTomorrow().then(res => {
            if (!res) {
                element.addAlert('.match__tomorrow');
                return '';
            }
            const datas = res.matches;
            store.tomorrow.push(datas);
            renderMatch(datas, '.match__tomorrow');
        });
    } else {
        const datas = store.tomorrow[0];
        renderMatch(datas, '.match__tomorrow');
    }
}

const renderMatch = (datas, el) => {
    if (!datas) return '';
    element.checkElement(`${el} .loading`).then(wrapper => {
        wrapper.remove();
    })

    element.checkElement(el).then(wrapper => {
        datas.map(data =>
            wrapper.innerHTML += `
            <div class="match">
                <div class="time">
                    <h6>${date.getTime(data.utcDate)}</h6>
                </div>
                <div class="team">
                    <div>
                        <h6>${data.homeTeam.name}</h6>
                    </div>
                    <div>
                        <h6>${data.awayTeam.name}</h6>
                    </div>
                </div>
                <div class="action">
                    <div onclick="alert(${data.id})" class="icon bg__setup"></div>
                </div>
            </div>`
        )
    });
}

export default matchPage;