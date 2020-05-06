// function Drag(el) {
//   this.el = el
// }
// Drag.prototype.down = function () {
//   this.el.onmousedown = (e) => {
//     const x = e.clientX - this.el.offsetLeft
//     const y = e.clientY - this.el.offsetTop
//     this.move(x, y)
//   }
// }
// Drag.prototype.move = function (x, y) {
//   document.onmousemove = e => {
//     const newX = e.clientX - x
//     const newY = e.clientY - y
//     this.el.style.left = newX + 'px'
//     this.el.style.top = newY + 'px'
//     this.up()
//   }
// }
// Drag.prototype.up = function () {
//   document.onmouseup = () => {
//     document.onmousemove = null
//   }
// }

class Drag {
  constructor(el) {
    this.el = el
    this.down()
  }
  down() {
    this.el.onmousedown = e => {
      const x = e.clientX - this.el.offsetLeft
      const y = e.clientY - this.el.offsetTop
      this.move(x, y)
    }
  }
  move(x, y) {
    document.onmousemove = e => {
      const newX = e.clientX - x
      const newY = e.clientY - y
      this.el.style.left = newX + 'px'
      this.el.style.top = newY + 'px'
      this.up()
    }
  }
  up() {
    document.onmouseup = () => {
      document.onmousemove = null
    }
  }
}

new Drag(document.querySelector('.drag_box')).down()
new Drag(document.querySelector('.drag_box_two')).down()
