import postcss from 'postcss';
import test    from 'ava';

import plugin from './';

function run(t, input, output, opts = { }) {
    return postcss([ plugin(opts) ]).process(input)
        .then( result => {
            t.deepEqual(result.css, output);
            t.deepEqual(result.warnings().length, 0);
        });
}

test('doesn\'t apply when background shorthand has more values', t => {
    return run(t,
        'a{ background: #fff url(../bg.png)}',
        'a{ background: #fff url(../bg.png)}');
});

test('use background-color instead of shorthand with color name', t => {
    return run(t,
        'a{ background: white }',
        'a{ background-color: white }');
});

test('use background-color instead of shorthand with hex', t => {
    return run(t,
        'a{ background: #fff }',
        'a{ background-color: #fff }');
});

test('use background-color instead of shorthand with rgba', t => {
    return run(t,
        'a{ background: rgba(255, 255, 255, 0) }',
        'a{ background-color: rgba(255, 255, 255, 0) }');
});

test('use background-color instead of shorthand with hsl', t => {
    return run(t,
        'a{ background: hsl(0, 100%, 50%); }',
        'a{ background-color: hsl(0, 100%, 50%); }');
});
