import * as sapper from '@sapper/app';
import '../static/_sass/global.scss';

sapper.start({
    target: document.querySelector('#sapper'),
});

if (module.hot) {
    module.hot.accept();
}

window.__sapper = sapper;
