/**
 * 版本1:  2020 05 04
 *    弹窗
 *    自定义事件
 *    传入配置
 *    传入回调
 * 
 * 待更新....
 * 是否可以拖拽
 * 迭代2： 自定义事件更换为 浏览器api 自定义事件 customEvent
 * 迭代3： 添加input框   回调返回 input 值
 */

class myMessage extends myEvent {
  constructor(options) {
    super()
    this.opt = Object.assign({
      width: 420,
      title: '提示',
      content: '这是一段内容',
      showCancel: true,
      cancelText: '取消',
      showConfirm: true,
      confirmText: '确定',
      isInput: false,
      confirm() {
        console.log('默认配置, 点击了确定');
      },
      cancel() {
        console.log('默认配置, 点击了取消');
      }
    }, options)
    this.init()
  }
  init() {
    this.randerView()

    this.addEvent('confirm', this.opt.confirm)
    this.addEvent('cancel', this.opt.cancel)

    this.el.querySelector('.g-message-box').addEventListener('click', e => {
      switch (e.target.className) {
        case "g-message-box_headerbtn":
          this.trigger('cancel')
          this.close()
          break
        case "confirm":
          this.trigger('confirm')
          this.close()
          break
      }
    })
  }
  randerView() {
    const el = document.createElement('div')
    el.innerHTML = `
    <div class="g-message-box_wrapper">
      <div class="g-message-box" style="width:${this.opt.width}px">
        <div class="g-message-box_header">
          <div class="g-message-box_title">
            <span>${this.opt.title}</span>
          </div>
          <button class="g-message-box_headerbtn">
            X
          </button>
        </div>
        <div class="g-message-box_content">
          <div class="g-message-box_container">
            <div class="g-message-box_message">
              <p>${this.opt.content}</p>
            </div>
          </div>
          <div class="g-message-box_input" style="display: ${this.opt.isInput ? 'block' : 'none'}">
            <div class="g-input">
              <input type="text" class="g-input_inner" />
            </div>
          </div>
        </div>
        <div class="g-message-box_btns">
          <button class="g-button" style="display: ${this.opt.showCancel ? 'inner' : 'none'}">
            <span class="cancel">${this.opt.cancelText}</span>
          </button>
          <button class="g-button" style="display: ${this.opt.showConfirm ? 'inner' : 'none'}">
            <span class="confirm">${this.opt.confirmText}</span>
          </button>
        </div>
      </div>
    </div>
    `
    document.body.appendChild(el)
    this.el = el
  }
  close() {
    document.body.removeChild(this.el)
  }
}

document.querySelector('.test-btn').onclick = function () {
  new myMessage({
    title: '警告',
    content: '确定要删除嘛?',
    showCancel: true,
    cancelText: '再看看',
    showConfirm: true,
    confirmText: '删除',
    isInput: false,
    confirm() {
      console.log('传入确定回调');
    }
  })
}