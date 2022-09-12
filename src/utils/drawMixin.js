// 屏幕适配 mixin 函数

// * 默认缩放值
const scale = {
  width: '1',
  height: '1',
}

// * 设计稿尺寸（px）
const baseWidth = 1920
const baseHeight = 1080

// * 需保持的比例（默认1.77778）
const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5))

export default {
  data() {
    return {
      // * 定时函数
      drawTiming: null
    }
  },
  mounted () {
    this.calcRate()
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    calcRate () {
      const appRef = this.$refs["appRef"]
      if (!appRef) return
      // 当前宽高比
      const currentRate = parseFloat((window.innerWidth / window.innerHeight).toFixed(5))
      if (appRef) {
        if (currentRate > baseProportion) {
          // 表示更宽
          scale.width = ((window.innerWidth) / baseWidth*5/6).toFixed(5)
          scale.height = (scale.width/1.09).toFixed(5)
          appRef.style.transform = `scale(${scale.width}, ${scale.height}) translate(0%, 0%)`
          appRef.style.transformOrigin='0% 0%'
        } else {
          // 表示更高
          scale.width = ((window.innerWidth) / baseWidth*5/6).toFixed(5)
          scale.height = (scale.width/1.09).toFixed(5)
          appRef.style.transform = `scale(${scale.width}, ${scale.height}) translate(0%, 0%)`
          appRef.style.transformOrigin='0% 0%'
        }
      }
    },
    resize () {
      clearTimeout(this.drawTiming)
      this.drawTiming = setTimeout(() => {
        this.calcRate()
      }, 200)
    }
  },
}
