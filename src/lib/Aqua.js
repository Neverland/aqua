/**
 * @file Aqua.js
 * @author ienix(guoaimin01@baidu.com)
 *
 * @since 2017/7/14
 */

import defaultOption from './option';

export default
class Aqua {
    constructor(setting = {}) {
        let option = {
            version: '0.0.1',
            debug: false,
            setting,
            mockup: {},
            $methodList: [],
            $methodCount: 0,
            $method: {},
            $plugin: {},
            $error: {},
            $props: Object.assign({}, defaultOption, setting)
        };

        Object.assign({}, this, option);

        this.initialize();
    }
    initialize() {
        [
            'method',
            'plugin',
            'error'
        ]
            .forEach(property => {
                let value = this.$props[property];

                if ('object' === typeof value) {
                    this[`$${property}`] = value;
                }
            });

        this.scanMethod();
        this.$registerMethod();

    }
    $defaultData(method) {
        let defaultData = {
            method,
            support: false,
            message:'not support',
            data: {}
        };

        return this.$props.defaultData || defaultData;
    }
    $registerMethod() {
        this.$methodList.forEach(methodName => {
            this.$method[methodName] = this.method[methodName];
            this.$mockup[methodName] = this.mockup[methodName];
        });
    }
    $mockup(method) {
        return this.$defaultData(method);
    }
    $excute(method, param) {
        if (this.debug) {
            return Promise.resolve(this.$defaultData(method));
        }

        if (this.$methodList.includes(method)) {
            return this.$method('method', param);
        }
    }
    private scanMethod() {
        if ('object' === typeof this.$method) {
            return false;
        }

        this.$methodList = Object.keys(this.$method);
        this.$methodCount = this.$methodList.length;
    }
    static use() {

    }
}
