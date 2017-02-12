import { animate, state, style, transition, trigger } from '@angular/core';

export const FlyInOutAnimation = trigger('flyInOut', [
    state('in', style({ opacity: 1, transform: 'translateX(0)' })),
    transition('void => *', [
        style({
            opacity: 0,
            transform: 'translateX(-100%)'
        }),
        animate('0.3s ease-in')
    ]),
    transition('* => void', [
        animate('0.3s 10 ease-out', style({
            opacity: 0,
            transform: 'translateX(100%)'
        }))
    ])
]);
