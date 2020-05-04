/**
 * 自定义事件
 * 个人实现版本
 * 浏览器 API 版
 */

class myEvent {
  constructor() {
    this.handles = {}
  }
  addEvent(eventName, fn) {
    /**
     * 添加自定义事件
     */
    if (!(eventName in this.handles)) {
      this.handles[eventName] = []
    }
    this.handles[eventName].push(fn)
  }
  trigger(eventName) {
    /** 
     * 触发器
     * 判断 eventName 是否存在
    */
    if (!eventName in this.handles) return

    this.handles[eventName].forEach(v => {
      v()
    })
  }
  removeFn(eventName, fn) {
    if (!eventName in this.handles && this.handles[eventName].some(v !== fn)) return

    const index = this.handles[eventName].findIndex(v => v === fn)
    this.handles[eventName].splice(index, 1)
  }
}