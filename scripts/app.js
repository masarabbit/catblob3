function init() {
  const canvas = document.querySelector('canvas')
  const isNo = x => typeof x === 'number'
  const px = n => `${n}px`
  const setPos = ({ el, x, y }) =>
    Object.assign(el.style, { left: `${x}px`, top: `${y}px` })
  const setStyles = ({ el, x, y, w, h, d }) => {
    const m = d || 1
    if (isNo(w)) el.style.width = px(w * m)
    if (isNo(h)) el.style.height = px(h * m)
    el.style.transform = `translate(${x ? px(x) : 0}, ${y ? px(y) : 0})`
  }

  const setUpCanvas = ({ canvas, w, h, ctx }) => {
    canvas.setAttribute('width', w)
    canvas.setAttribute('height', h || w)
    ctx.imageSmoothingEnabled = false
  }

  const spriteSheets = document.querySelectorAll('.pix')

  const ctx = canvas.getContext('2d')

  setUpCanvas({
    canvas,
    w: 500,
    ctx,
  })

  const catBlob = {
    pos: {
      x: 100,
      y: 100,
    },
    sprite: {
      w: 22,
      h: 22,
    },
    w: 44,
    h: 44,
    frame: 0,
  }

  let fps, fpsInterval, startTime, now, then, elapsed

  const startAnimating = fps => {
    fpsInterval = 1000 / fps
    then = Date.now()
    startTime = then
    animate()
  }

  const animate = () => {
    now = Date.now()
    elapsed = now - then

    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval)
      catBlob.frame = catBlob.frame === 2 ? 0 : catBlob.frame + 1
    }

    ctx.clearRect(catBlob.pos.x, catBlob.pos.y, catBlob.w, catBlob.h)
    ctx.drawImage(
      spriteSheets[0],
      0,
      catBlob.frame * 22,
      catBlob.sprite.w,
      catBlob.sprite.h,
      catBlob.pos.x,
      catBlob.pos.y,
      catBlob.w,
      catBlob.h,
    )
    requestAnimationFrame(animate)
  }

  startAnimating(4)
}

window.addEventListener('DOMContentLoaded', init)
