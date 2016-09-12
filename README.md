# postcss-shorthand-to-background-color [![Build Status][ci-img]][ci]

[PostCSS] plugin to avoid using background shorthand to set the background-color only.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/dmarchena/postcss-shorthand-to-background-color.svg
[ci]:      https://travis-ci.org/dmarchena/postcss-shorthand-to-background-color

```css
.foo {
  /* Input example */
  background: #fff;
}
```

```css
.foo {
  /* Output example */
  background-color: #fff;
}
```

## Usage

```js
postcss([ require('postcss-shorthand-to-background-color') ])
```

See [PostCSS] docs for examples for your environment.
