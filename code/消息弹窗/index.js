/**
 * 版本1:  2020 05 04
 *    弹窗
 *    自定义事件
 *    传入配置
 *    传入回调
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
      dragable: true, //是否可拖拽
      maskable: true, //是否有遮罩
      isInput: false, // 是否是 input 框
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
        case "g-button cancel":
        case "g-message-box_headerbtn":
          this.trigger('cancel')
          this.close()
          break
        case "g-button confirm":
          this.trigger('confirm')
          this.close()
          break
      }
    }, false)
  }

  randerView() {
    const el = document.createElement('div')
    el.classList.add('g-message-box_wrapper')
    el.style.zIndex = 2020
    el.innerHTML = `
      <div class="g-message-box" style="z-index: 2020; width:${this.opt.width}px">
        <div class="g-message-box_header">
          <div class="g-message-box_title">
            <span>${this.opt.title}</span>
          </div>
          <button class="g-message-box_headerbtn">
            X
          </button>
        </div>
        <div class="g-message-box_content">
          <div class="g-message-box_container" style="display: ${this.opt.isInput ? 'none' : 'block'}">
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
          <button class="g-button cancel" style="display: ${this.opt.showCancel ? 'inner' : 'none'}">
            ${this.opt.cancelText}
          </button>
          <button class="g-button confirm" style="display: ${this.opt.showConfirm ? 'inner' : 'none'}">
            ${this.opt.confirmText}
          </button>
        </div>
      </div>
      `
    document.body.appendChild(el)

    if (this.opt.maskable) {
      const mask = document.createElement('div')
      mask.classList.add('mask')
      mask.style.zIndex = 2000
      document.body.appendChild(mask)
    }

    this.el = el
  }
  close() {
    document.body.removeChild(this.el)
    document.body.removeChild(document.querySelector('.mask'))
  }
}

document.querySelector('.test-btn').onclick = function () {
  new myMessage({
    width: 420,
    title: '警告',
    content: '确定要删除嘛',
    showCancel: true,
    cancelText: '取消',
    showConfirm: true,
    confirmText: '确定',
    dragable: true, //是否可拖拽
    maskable: true, //是否有遮罩
    isInput: false, // 是否是 input 框
    confirm() {
      console.log('传入配置, 点击了确定');
    },
    cancel() {
      console.log('传入配置, 点击了取消');
    }
  })
}