/**
 * 文件描述
 * @author ydr.me
 * @create 2016-06-27 17:34
 */


'use strict';

var keyframe = require('../src/index');

var kf1 = keyframe.create({
    0: {
        width: 100,
        transform: {
            translate: 100,
            rotate: 90
        }
    },
    1: {
        width: 300,
        transform: {
            translate: 0,
            rotate: 180
        }
    }
});

console.log(keyframe.style(kf1));


