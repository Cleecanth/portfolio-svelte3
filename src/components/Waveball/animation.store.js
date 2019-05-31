import { interpolate } from 'polymorph-js';
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';
import { writable } from 'svelte/store';

export default function(fromGroup, toGroup) {

    const groups = groupPaths(fromGroup, toGroup);
    const inerpolator = (group) => interpolate([group[0], group[1]]);
    const progress = 0;

    groups.forEach((group) => {
        tweened(, {
            easing: cubicOut,
            interpolate: (from, to) => {
                interpolator()
        })
    )
    // const interpolator = interpolate(['#play', '#pause'], {
    //     addPoints: 0,
    //     origin: { x: 0, y: 0 },
    //     optimize: 'fill',
    //     precision: 0,
    // });



    // pass a number between 0 and 1. 0.5 is 50% in the middle.
}

function groupPaths(fromGroup, toGroup) {
    const groups = [];
    fromGroup.forEach((group, i) => {
        groups.push([group, toGroup[i]]);
    });

    return groups;
}
