/**
 * @file Aqua.js
 * @author ienix(enix@foxmail.com)
 *
 * @since 2017/7/14
 */

import defaultOption from '../option/index';

export default
class Aqua {
    constructor(setting = {}) {
        let option = {
            version: '0.0.1',
            debug: false,
            setting,
            $methodList: [],
            $methodCount: 0,
            $plugin: {},
        };

        Object.assign({}, this, defaultOption, option);

        this.initialize();
    }
    initialize() {
        [
            'method',
            'error',
            'mockup'
        ]
            .forEach(property => {
                let handler = this[property];

                if (!handler) {
                    handler = () => this.placeholder(...arguments);
                }

                if ('object' === typeof handler) {
                    this[`$${property}`] || (this[`$${property}`] = handler);
                }
            });

        this.scanMethod();
        this.$registerMethod();

    }
    $defaultData(method, param) {
        let data = {
            method,
            support: false,
            message: `The method \`${method}\` is not support!`,
            data: {}
        };

        if (this.debug) {
            data = this.$mockup(...arguments);
        }

        return data;
    }
    $registerMethod() {
        this.$methodList.forEach(methodName => {
            this.$method[methodName] = this.placeholder(methodName);
        });
    }
    $excute(method, param) {
        if (this.debug) {
            return Promise.resolve(this.$defaultData(...arguments));
        }

        if (this.$methodList.includes(method)) {
            return this.$method(...arguments);
        }
    }
    scanMethod() {
        if ('object' === typeof this.$method) {
            return false;
        }

        this.$methodList = Object.keys(this.$method);
        this.$methodCount = this.$methodList.length;
    }
    placeholder() {
        return this.$defaultData(...arguments);
    }
    static use() {

    }
}
