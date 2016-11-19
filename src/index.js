/**
 * core/keyframe
 * @author ydr.me
 * @create 2016-04-19 18:21
 */



'use strict';


var access = require('blear.utils.access');
var typeis = require('blear.utils.typeis');
var object = require('blear.utils.object');
var array = require('blear.utils.array');
var string = require('blear.utils.string');
var random = require('blear.utils.random');
var date = require('blear.utils.date');
var modification = require('blear.core.modification');
var attribute = require('blear.core.attribute');
var selector = require('blear.core.selector');

var reNumber = /^(\d+?\.)?\d+$/;
var reSperator = /\s+|,\s*|\|\s*/g;
// 标准规范已经不推荐使用连字符命名 keyframe name 了
var KEYFRAME_PREFIX = 'a';
var VENDOR_PREFIX = ['-webkit-', '-moz-', '-ms-', ''];
/**
 * 帧动画 MAP，用于管理
 * @type {{}}
 */
var keyframesMap = {};
var styleEl = modification.create('style', {
    id: 'blear-core-keyframe'
});
var headEl = selector.query('head')[0] || document.documentElement;

modification.insert(styleEl, headEl);


/**
 * 在 DOM 中创建一个帧动画样式
 * @param [name] {String} 帧动画名称
 * @param descriptions {Object} 帧动画帧描述
 * @returns {String}
 */
exports.create = function (name, descriptions) {
    var args = access.args(arguments);

    if (!typeis.String(name)) {
        descriptions = args[0];
        name = KEYFRAME_PREFIX + random.guid();
    }

    var mainStyle = '';

    object.each(descriptions, function (percent, properties) {
        var percentList = String(percent).split(reSperator);

        array.each(percentList, function (index, percent) {
            percent = string.trim(percent);
            percent = reNumber.test(percent) ? percent * 100 + '%' : percent;
            mainStyle += percent + '{';

            var transformKey = '';
            var transformVal = [];

            object.each(properties, function (key, val) {
                var fix = attribute.css(key, val);

                if (!fix.key) {
                    return;
                }

                mainStyle += fix.key + ':' + fix.val + ';';
            });

            mainStyle += (transformVal.length ? transformKey + ':' + transformVal.join(' ') : '') + '}';
        });
    });

    var style = '';

    if (typeof DEBUG !== 'undefined' && DEBUG === true) {
        style += '/*\n' +
            ' * keyframe ' + name + '\n' +
            ' * @create at ' + date.format() + '\n' +
            ' */\n';
    }

    array.each(VENDOR_PREFIX, function (i, prefix) {
        style += '@' + prefix + 'keyframes ' + name + '{' + mainStyle + '}';
    });

    if (typeof DEBUG !== 'undefined' && DEBUG === true) {
        style += '\n/**/\n\n';
    }

    keyframesMap[name] = style;
    modification.importStyle(style, styleEl, true);

    return name;
};


/**
 * 获取帧动画的样式
 * @param name {String} 帧动画名称
 * @returns {String}
 */
exports.style = function (name) {
    return keyframesMap[name];
};
