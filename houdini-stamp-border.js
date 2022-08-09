if (typeof registerPaint !== 'undefined') {
  class StampBorder {
    static get inputProperties() {
      return ['--stamp-borderRadius', '--stamp-borderColor', '--stamp-cornerFactor']
    }
  
    paint(ctx, size, properties) {
      const r = parseInt(properties.get('--stamp-borderRadius')) || 7
      const color = String(properties.get('--stamp-borderColor')) || 'black'
      const c = parseFloat(properties.get('--stamp-cornerFactor')) || 1.0

      ctx.lineWidth = 1
      ctx.fillStyle = color

      // draw the borders and rotate them around, can you figure out why it's this order?
      drawBorderAndRotate(size.height, size.width)
      drawBorderAndRotate(size.width, size.height)
      drawBorderAndRotate(size.height, size.width)
      drawBorderAndRotate(size.width, size.height)

      // draw border on top; rotate and translate to the right side
      function drawBorderAndRotate(w, translateX) {
        // no of holes should have the same width as 2*r + the same amount of bridges
        const holes = Math.floor(w / r / 2 / 2)
        // calculate width of all punchholes plus 2 half punch holes on either side and divide by number of bridges
        const bridge = (w - (holes + 1)*r*2) / (holes + 1)
        // it seems this rotates and translates the canvas before drawing on it
        ctx.translate(translateX, 0)
        ctx.rotate(.5*Math.PI)
        // begin drawing one border
        ctx.beginPath()
        // move to top left inner corner of the border
        ctx.moveTo(r*2,r*2)
        // draw a line to the top bottom corner of the top left punchout
        ctx.lineTo(0, r*c)
        // draw arc for top left punchout
        ctx.arc(0, 0, r*c, .5*Math.PI, 0, true)
        // for number of holes (not including 0)
        for (let i = 0; i <= holes-1; i++) {
          // this should be about the the position where the current arc should begin
          const pitstop = i*(bridge+r*2)
          // draw the bridge from the last arc
          ctx.lineTo(r+bridge+pitstop, 0)
          // drwaw a nice half circle
          ctx.arc(r+bridge+pitstop+r, 0, r, Math.PI, 0, true)
        }
        // draw last bridge to top right punchout
        ctx.lineTo(w-r*c, 0)
        // draw arc for top right punchout
        ctx.arc(w, 0, r*c, Math.PI, .5*Math.PI, true)
        // draw line to top right inner corner of the border
        ctx.lineTo(w-r*2,r*2)
        // my work here is done!
        ctx.closePath();
        // almost
        ctx.fill()
      }  
    }
  }
  // register paint worklet
  registerPaint('houdini-stamp-border', StampBorder)
}