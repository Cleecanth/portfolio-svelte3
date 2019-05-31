function collectPathVals(paths) {
    let pathVals = [];
    for (let i = 0; i < paths.length; i++) {
        pathVals.push(paths[i].attributes.d.nodeValue);
    }

    return pathVals;
}

function getDuration(index, groupLen, seed = 9043) {
    const durIndex = groupLen - index + 3;
    return (seed + index * 7) * (durIndex / groupLen);
}

/* Set up animation */
function setupTimeline(anime, pathGroups, delaySeed = 1913, reverse = false) {
    let [fromElements, toValues] = pathGroups;
    const offset = delaySeed / toValues.length;

    let timeline = anime({
        autoplay: false,
        direction: 'alternate',
        loop: true,
        targets: fromElements,
        easing: 'easeInOutQuad',
        d: (el, i) => toValues[i],
        duration: (el, i, l) => {
            i = reverse ? l - i : i;
            return getDuration(offset * (i/2), delaySeed);
        },
        delay: (el, i, l) => {
            i = reverse ? i : l - (i + 1);
            return anime.stagger(
                offset,
                {direction: 'reverse'}
                )(el, i, l);
        }
        // delay: (el, i, l) => {
        //     i = reverse ? i : l - (i + 1);
        //     let delay = i > 0 ? delaySeed / (80 + i * 5) : 0;
        //     delay += offset / 3;
        //     return anime.stagger(50, { direction: 'reverse' })(el, i, l);
        // },
        //endDelay: 10,
    });

    return timeline;
}

export default function(anime, fromGroup, toGroup) {
    const fromPaths = fromGroup.children;
    const toPaths = toGroup.children;

    function Animation(timeline) {
        this.anime = anime;

        this.timeline = setupTimeline(this.anime, ...timeline);

        this._destroy = () => {
            anime.remove(fromPaths);
            anime.remove(toPaths);
            delete this.anime;
            delete this.timeline;
        };
        this._stop = () => {
            this.seek(0);
            this._destroy();
        };

        this.play = this.timeline.play;

        this.seek = this.timeline.seek;

        this.pause = this.timeline.pause;

        this.toggle = () => {
            return this.timeline.paused ? this.play() : this.pause();
        };

        return this;
    }

    function init() {
        const fromPathVals = collectPathVals(fromPaths);
        const toPathVals = collectPathVals(toPaths);
        //console.log(reverseArray(toPaths));
        const timelines = addMethods([]);

        timelines.push(new Animation([[toPaths, fromPathVals], 3697]));

        timelines.push(new Animation([[fromPaths, toPathVals], 5039, true]));

        return timelines;
    }

    function addMethods(timelines) {
        timelines.play = () => {
            timelines.forEach((timeline) => {
                timeline.play();
            });
        };

        timelines.toggle = () => {
            timelines.forEach((timeline) => {
                timeline.toggle();
            });
        };

        timelines.seek = (number) => {
            timelines.forEach((timeline) => {
                timeline.seek(number);
            });
        };

        timelines._stop = () => {
            timelines.forEach((timeline) => {
                timeline._stop();
            });
        };

        timelines._reinit = () => {
            timelines.forEach((timeline) => {
                timeline.pause();
                timeline._stop();
            });

            return init();
        };

        return timelines;
    }

    if (typeof window !== 'undefined') {
        let timeline = init(timeline);

        console.log(timeline);

        return timeline;
    }
}
