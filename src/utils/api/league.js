import element from '../config/element';
import leagueIcon from '../../components/image';
import league from './fetch/league';

let store = {
    league: {
        'logo': Object.values(leagueIcon),
        'name': Object.keys(leagueIcon),
        'key': [2072, 2081, 2088, 2114, 2224]
    }
}

const leaguePage = () => {
    renderLeague();
}

const renderLeague = () => {
    element.checkElement(`.league__list`).then(wrapper => {
        const data = store.league;
        for (let i = 0; i < data.name.length; i++) {
            wrapper.innerHTML += `
            <div class="league" data-name="${data.name[i]}" data-key="${data.key[i]}">
                <div>
                    <img src="${data.logo[i]}">
                    <h6 class="tx__cap">${data.name[i]}</h6>
                </div>
                <div class="arrow__down bg__setup"></div>
            </div>
            <div class="league__detail__list league__${data.name[i]}"></div>
            `
        }
    });

    renderDetail();
}

const renderDetail = () => {
    element.checkMultiElement(`.league`).then(wrapper => {
        for(let i = 0; i < wrapper.length; i++) {
            wrapper[i].addEventListener('click', ((e) => {
                let key = store.league.key[i];
                let el = store.league.name[i];
                let isActive = e.target.classList.contains('active');
                let isStore = `${key}` in store;
                
                if (isStore) {
                    renderDetailList(el, store[key]);
                } else {
                    league.leagueById(key).then(res => {
                        if (!res) {
                            console.log('error');
                            return 'error';
                        }
                        store[key] = res.competitions;
                        renderDetailList(el, store[key]);
                    })
                }
            }))
        }
    })
}

const renderDetailList = (el, datas) => {
    if (!datas) return '';
    element.checkElement(`.league__${el}`).then(wrapper => {
        if (wrapper.classList.contains('available')) {
            console.log('sudah ada');
            return '';
        }

        datas.map(data => {
            wrapper.innerHTML += `
            <div class=""detail__list>
                <h6>${data.name}</h6>
            </div>
            `
        })
    });
}

export default leaguePage;