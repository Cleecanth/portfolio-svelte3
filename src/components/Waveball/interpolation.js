import { interpolate } from 'polymorph-js';
import { tweened } from 'svelte/motion';
import { derived } from 'svelte/store';
import { linear } from 'svelte/easing';
import { assign } from 'svelte/internal';

export function interpolation(from, to) {
    return function(tick) {
        let values = from.values.map((value, i) => {
            return interpolate([value, to.values[i]])(tick);
        });

        return Object.assign({}, from, { values });
    };
}

export default function animate(options) {
    let { delay = 0, easing = linear, duration = 400, values = [] } = options;

    const store = tweened(
        { values },
        { delay, easing, duration, interpolate: interpolation }
    );

    store.tween = (new_options) => {
        let {
            delay = 0,
            easing = linear,
            duration = 400,
            values = []
        } = new_options;

        store.set(
            { values }
        );
    }

    return store;
}
