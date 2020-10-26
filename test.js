class Transform {
    constructor(selector) {
        this.el = document.querySelector(selector);
        this._queue = [];
        this.defaultTime = Transform.config.defaultTime;
        this.el.style.transition = `all ${.3}s`;
    }

    translate(value, time) {
        return this._add('translate', value, time);

    }

    scale(value, time) {
        return this._add('scale', value, time);
    }

    rotate(value, time) {
        return this._add('rotate', value, time);
    }

    // 将动画内容添加到队列中
    _add(type, value, time = this.defaultTime) {
        this._queue.push({
            type,
            value,
            time
        });
        return this;
    }

    // 动画添加完成，可以开始进行动画
    done() {
        this._start();
    }

    // 开始进行动画，根据队列顺序以及要求
    _start() {
        if (!this._queue.length) return;
        setTimeout(() => {
            const info = this._queue.shift();
            this.el.style.transition = `all ${info.time / 1000}s`
            this.el.style.transform += this._getTransform(info);
            setTimeout(() => {
                this._start();
            }, info.time);
        }, 0);
    }

    _getTransform({ type, value, time }) {
        switch (type) {
            case 'translate':
                return `translate(${value})`;
                break;
            case 'scale':
                return `scale(${value})`;
                break;
            case 'rotate':
                return `rotate(${value}deg)`;
                break;
        }
    }



}

Transform.config = {
    defaultTime: 300,
};


// 继承
class multiTransform extends Transform {
    multi(value, time) {
        return this._add('multi', value, time);
    }

    _getTransform({ type, value}) {
        switch (type) {
            case 'translate':
                return `translate(${value})`;
                break;
            case 'scale':
                return `scale(${value})`;
                break;
            case 'rotate':
                return `rotate(${value}deg)`;
                break;
            case 'multi':
                value.forEach(item => {
                    
                    this.el.style.transform +=this._getTransform(item);
                })
        }
    }

}







const tf = new multiTransform('.ball');
tf.translate('100px,100px')
    .scale(1.5)
    .rotate(180, 1000)
    .multi([
        {
            type: 'translate',
            value: '0,0'
        },
        {
            type: 'scale',
            value: .2
        }
    ])
    .done();



console.log(tf);
var ball = document.getElementsByClassName('ball')[0];
setTimeout(() => {console.log(ball.style.transform)},5000)
// console.log(document.querySelector('.ball').style.transform)
