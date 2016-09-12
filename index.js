var postcss = require('postcss');
var parser = require('postcss-value-parser');
var csscolors = require('css-color-names');

var pluginName = 'postcss-shorthand-to-background-color';

module.exports = postcss.plugin(pluginName, function () {
    return function (root) {
        root.walkDecls('background', function (decl) {
            var parsedValue = parser(decl.value);
            var parseToBgColor = false;

            if (parsedValue.nodes.length === 1) {
                parsedValue.walk(function (node) {
                    if (node.type === 'word') {
                        var isHex = /^\#[0-9a-f]{3,6}$/i.test(node.value);
                        var isColorname = node.value in csscolors;
                        parseToBgColor = isHex || isColorname;
                    } else if (node.type === 'function') {
                        var isColorFn =
                            ['rgb', 'rgba', 'hsl', 'hsla']
                                .indexOf(node.value) > -1;
                        parseToBgColor = isColorFn;
                    }
                    return false;
                });
            }
            if (parseToBgColor) {
                decl.prop = 'background-color';
            }
        });
    };
});
