/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var keyframe = require('../src/index.js');

describe('测试文件', function () {
    it('.create/.style@hasName', function (done) {
        var name = 'aaaa';
        var aaaa = keyframe.create(name, {
            '0 1': {
                width: 100,
                height: 200,
                transform: {
                    translateX: 100,
                    translateY: 200,
                    rotateX: 100,
                    rotateY: 200
                }
            },
            0.5: {
                width: 100,
                height: 300,
                transform: {
                    translateX: 100,
                    translateY: 200,
                    rotateX: 100,
                    rotateY: 200
                }
            }
        });

        expect(aaaa).toEqual(name);

        var style = keyframe.style(aaaa);

        console.log(style);
        expect(style).toMatch(/width:100px/);
        expect(style).toMatch(/height:300px/);
        expect(style).toMatch(/transform/);
        expect(style).toMatch(/@-webkit-keyframes/);

        done();
    });


    it('.create/.style@anonymous', function (done) {
        var name = 'aaaa';
        var aaaa = keyframe.create({
            '0 1': {
                width: 100,
                height: 200,
                borderTextRadius: 10,
                transform: {
                    translateX: 100,
                    translateY: 200,
                    rotateX: 100,
                    rotateY: 200
                }
            },
            0.5: {
                width: 100,
                height: 300,
                transform: {
                    translateX: 100,
                    translateY: 200,
                    rotateX: 100,
                    rotateY: 200
                }
            }
        });

        expect(aaaa).not.toEqual(name);

        var style = keyframe.style(aaaa);

        console.log(style);
        expect(style).toMatch(/width:100px/);
        expect(style).toMatch(/height:300px/);
        expect(style).toMatch(/transform/);
        expect(style).toMatch(/@-webkit-keyframes/);
        expect(style).not.toMatch(/border-text-radius/);

        done();
    });
});
