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
                <div class="icon arrow__down bg__setup"></div>
            </div>
            <div class="league__detail__list league__${data.name[i]}"></div>
            `
        }
        wrapper.querySelector('.loading').remove();
    });

    renderDetail();
}

const renderDetail = () => {
    element.checkMultiElement(`.league`).then(wrapper => {
        for (let i = 0; i < wrapper.length; i++) {
            wrapper[i].addEventListener('click', ((e) => {
                let key = store.league.key[i];
                let el = store.league.name[i];
                let isStore = `${key}` in store;

                let icon = wrapper[i].querySelector('.icon');

                icon.classList.remove('arrow__down');
                icon.classList.add('small__loading');

                if (isStore) {
                    renderDetailList(el, store[key], icon);
                } else {
                    league.leagueById(key).then(res => {
                        if (!res) {
                            element.checkElement(`.league__${el}`).then(wrapper => {
                                element.addAlert(`.league__${el}`);
                                wrapper.classList.add('active');
                                icon.classList.remove('small__loading');
                                icon.classList.add('arrow__down');
                            })
                            return '';
                        }
                        store[key] = res.competitions;
                        renderDetailList(el, store[key], icon);
                    })
                }
            }))
        }
    })
}

const renderDetailList = (el, datas, icon) => {
    if (!datas) return '';
    element.checkElement(`.league__${el}`).then(wrapper => {
        if (wrapper.classList.contains('active')) {
            wrapper.classList.remove('active');
        } else {
            if (wrapper.classList.contains('available')) {
                console.log('sudah ada');
            } else {
                datas.map(data => {
                    wrapper.innerHTML += `
                    <div class="detail__list">
                        <h6>${data.name}</h6>
                        <div class="action">
                            <div onclick="alert(${data.id})" class="icon bg__setup"></div>
                        </div>
                    </div>
                    `
                });
                wrapper.classList.add('available');
            }
            wrapper.classList.add('active');
        }

        icon.classList.remove('small__loading');
        icon.classList.add('arrow__down');
    });
}

export default leaguePage;