# mina-countdown

`mina-countdown`，一个方便、轻量的 **小程序** 倒计时逻辑库  
时间处理逻辑使用`tiny-timer`库，在此做出声明和感谢

## change log：

1. 2021.01.21 init package

## 支持的事件

#### 主动

- 支持 start 事件
- 支持 pause 事件
- 支持 resume 事件
- 支持 stop 事件

#### 监听

- 支持 tick 事件
- 支持 done 事件
- 支持 statusChanged 事件

## demo 展示

1. demo1：监听 pressMove 拖拽 手势
   | ![](https://636f-could-test-1258393788.tcb.qcloud.la/README/touchmove.gif) | ![](https://636f-could-test-1258393788.tcb.qcloud.la/QRCode/pages-mina-countdown-demo1-index_qrcode%3D1.jpg) |
   | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |

## 使用方法

**大致可以分为 4 步：**

1. npm 安装 mina-countdown，开发工具构建 npm
2. 引入 mina-countdown
3. onload 实例化 mina-countdown
4. wxml 展示倒计时

### 命令行

`npm install mina-countdown `  
安装完成后，开发工具构建 npm

### \*.js

```javascript
import Countdown from 'mina-countdown'; // 1. 引入mina-countdown

Page({
  onLoad: function (options) {
    // 2. onload实例化mina-countdown
    // 会创建this.countdown指向实例对象
    new Countdown(this, 'countdown', {
      // 大多数情况只需要监听 tick 事件，更新 this.data.countdown 即可满足大部分场景
      tick: function (countdown) {
        // 在Countdown倒计时过程中触发，触发事件间隔为1s，参数单位：秒
        console.log('countdown:' + countdown);
        // 更新 data.countdown 做渲染使用
        this.setData({
          countdown,
        });
      },
      done: function () {
        //在Countdown倒计时结束时触发
        console.log('done');
      },
      statusChanged: function (status) {
        //在Countdown状态改变时触发，status代表下一步的状态 'running' | 'paused' | 'stopped'
        console.log('status:' + status);
      },
    });
  },
  startCountdown: function (duration = 60) {
    this.countdown.start(duration); // 支持传入倒计时时间，单位：秒
  },
  pauseCountdown: function () {
    this.countdown.pause();
  },
  resumeCountdown: function () {
    this.countdown.resume();
  },
  stopCountdown: function () {
    this.countdown.stop();
  },
});
```

### \*.wxml

在 view 上利用 countdown 处理渲染逻辑

#### 简单展示

```html
<text wx:if="{{countdown>0}}"> 倒计时{{countdown}}秒 </text> <text wx:else> 开始倒计时 </text>
```

#### 配合 mina-tool 的 wxs 工具 formatCountdown 优化展示

使用 mina-tool,请参看 [mina-tool.wxs](https://github.com/Yrobot/mina-tool#wxs)

```html
<wxs src="mina-tool/wxs/format.wxs" module="format" /> <text> {{format.formatCountdown(countdown)}} </text>
```

---

以上简单几步即可使用 mina-countdown
