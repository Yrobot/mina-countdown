import Timer from 'tiny-timer';

const DEFAULT_OPTIONS = {
  tick: function () {},
  done: function () {},
  statusChanged: function () {},
};

export default class Countdown {
  _name = '';
  _option = {};
  _timer = new Timer({ interval: 1000 });
  constructor(_page, name, option = {}) {
    try {
      if (this._checkBeforeCreate(_page, name)) {
        this._name = name;
        _page[name] = this;
      }
    } catch (error) {
      console.error(error);
    }
    this._option = { ...DEFAULT_OPTIONS, ...option };
    this._distributeHandlers();
  }
  _distributeHandlers() {
    this._timer.on('tick', (ms) => {
      this._option['tick'](Math.round(ms / 1000));
    });
    this._timer.on('done', this._option['done']);
    this._timer.on('statusChanged', this._option['statusChanged']);
  }
  _checkBeforeCreate(_page, name) {
    if (!_page || !name) {
      throw new Error('Countdown实例化时，必须传入page对象和引用名');
    }
    if (_page[name]) {
      throw new Error('Countdown实例化error： ' + name + ' 已经存在page中');
    }
    return true;
  }
  start(duration = 60) {
    this._timer.start(duration * 1000);
  }
  pause() {
    this._timer.pause();
  }
  resume() {
    this._timer.resume();
  }
  stop() {
    this._timer.stop();
  }
}
