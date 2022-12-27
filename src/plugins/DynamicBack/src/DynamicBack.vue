<template>
  <canvas id="canvas"></canvas>
</template>

<script>
export default {
  mounted() {
    this.colors = document.querySelector('canvas').colors;
    this.init();
    addEventListener('resize', this.clear);
  },
  data() {
    return {
      w: undefined,
      h: undefined,
      ctx: undefined,
      animation: undefined,
      practicals: [],
      colors: [],
      practical: class Practical {
        constructor(colors, randomNum, w, h, ctx) {
          this.size = randomNum(40) + 1;
          this.color = colors[randomNum(colors.length)];
          this.x = randomNum(w);
          this.y = randomNum(h);
          this.w = w;
          this.h = h;
          this.offsetX =
            (randomNum(6) + 1) * (Math.random() * 1 > 0.5 ? 1 : -1);
          this.offsetY =
            (randomNum(9) + 1) * (Math.random() * 1 > 0.5 ? 1 : -1);
          this.ctx = ctx;
        }
        draw() {
          this.ctx.beginPath();
          this.ctx.fillStyle = this.color;
          this.ctx.globalCompositeOperation = 'lighter';
          this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          this.ctx.closePath();
          this.ctx.fill();
        }
        update() {
          this.x += this.offsetX;
          this.y += this.offsetY;
          if (
            this.x - this.size >= this.w ||
            this.x + this.size <= 0 ||
            this.y - this.size >= this.h ||
            this.y + this.size <= 0
          ) {
            this.reverse();
          } else this.draw();
        }
        reverse() {
          this.offsetX = -this.offsetX;
          this.offsetY = -this.offsetY;
        }
      },
    };
  },
  methods: {
    clear() {
      this.practicals = [];
      clearInterval(this.animation);
      this.ctx.clearRect(0, 0, this.w, this.h);
      this.init();
    },
    init() {
      /** @type {HTMLCanvasElement}*/
      const canvas = document.querySelector('#canvas');
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      const ctx = canvas.getContext('2d');
      canvas.style.background = '#000';
      this.initializeCanvas(ctx, canvas.width, canvas.height);
    },
    randomNum(n) {
      return Math.floor(Math.random() * n);
    },
    initializeCanvas(ctx, w, h) {
      ctx.clearRect(0, 0, w, h);
      for (let index = 0; index < 120; index++) {
        const current = new this.practical(
          this.colors,
          this.randomNum,
          w,
          h,
          ctx
        );
        this.practicals.push(current);
        this.practicals[index].draw();
      }
      this.getAnimated(ctx, w, h);
    },
    animate(ctx, w, h) {
      this.ctx.clearRect(0, 0, this.w, this.h);
      for (let index = 0; index < this.practicals.length; index++) {
        const ele = this.practicals[index];
        ele.update();
      }
    },
    getAnimated(ctx, w, h) {
      (this.ctx = ctx), (this.w = w), (this.h = h);
      this.animation = setInterval(this.animate, 25);
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
</style>
