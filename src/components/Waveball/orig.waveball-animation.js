/* eslint-disable*/
///*
import anime from 'animejs';

console.clear();

const fromPaths = collectPathVals(
    document.querySelectorAll('#waveball__paths--from path'),
    true,
    0
);
const toPaths = collectPathVals(
    document.querySelectorAll('#waveball__paths--to path'),
    false,
    0
);
const toLen = toPaths.length;

let timeline = anime.timeline({
    autoplay: true,
    direction: 'alternate',
    loop: true,
});

timeline = animatePaths(toPaths, timeline);

const fromPaths2 = collectPathVals(
    document.querySelectorAll('#waveball__paths--to path'),
    true,
    toLen + 1
);

const toPaths2 = collectPathVals(
    document.querySelectorAll('#waveball__paths--from path'),
    false,
    toLen + 1
);

let timeline2 = anime.timeline({
    autoplay: true,
    direction: 'alternate',
    loop: true,
});

timeline2 = animatePaths(toPaths2, timeline2, 3);

/* debugging */
window._timline = { timeline, timeline2 };

/* Set up animation */
function animatePaths(pathGroup, timeline, delaySeed = 619) {
    const offsetSeed = delaySeed / 89;

    return pathGroup.forEach(function(path, index) {
        return timeline.add({
            targets: '#' + path.id,
            d: {
                value: [path.value],
                duration: getDuration(index),
                easing: 'easeInOutQuad',
                delay: delaySeed * index + offsetSeed,
                endDelay: getDuration(offsetSeed, delaySeed * 89) * index,
            },
            offset: offsetSeed * index,
        });
    });
}

anime(
    {
        direction: 'alternate',
        loop: true,
        targets: '#waveball__paths--from',
        rotate: {
            value: [0, 37],
            duration: getDuration(toLen, 65423) * 3,
            delay: 37 + toLen,
        },
        easing: 'easeInOutCubic',
    },
    0
);

anime(
    {
        direction: 'alternate',
        loop: true,
        targets: '#waveball__paths--to',
        rotate: {
            value: [181, -37],
            duration: getDuration(toLen, 65419) * 5,
            delay: 311 + toLen,
        },
        easing: 'easeInOutCubic',
    },
    0
);

/* Utility Functions */

function getDuration(index, seed = 9043, groupLen = toLen) {
    let durIndex = groupLen - index + 3;
    return (seed + index * 7) * (durIndex / groupLen);
}

function collectPathVals(paths, setId, idStart = 0) {
    let path;
    let id = idStart;
    let pathVals = [];
    for (path of paths) {
        if (setId) path.setAttribute('id', 'path-' + id);

        pathVals.push({
            id: 'path-' + id,
            value: path.attributes.d.nodeValue,
        });
        id++;
    }

    return pathVals;
}

//*/
