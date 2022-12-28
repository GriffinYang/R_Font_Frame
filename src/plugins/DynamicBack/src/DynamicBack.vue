<template>
  <canvas id="canvas"></canvas>
</template>

<script>
export default {
  mounted() {
    this.colors = document.querySelector('canvas').colors;
    this.speed = document.querySelector('canvas').speed;
    this.size = document.querySelector('canvas').size;
    this.background = document.querySelector('canvas').background;
    this.practicalNumber = document.querySelector('canvas').practicalNumber;
    this.init();
    addEventListener('resize', this.clear);
  },
  data() {
    return {
      w: undefined,
      h: undefined,
      background: undefined,
      ctx: undefined,
      animation: undefined,
      practicalNumber: 50,
      speed: 25,
      practicals: [],
      colors: [],
      size: undefined,
      practical: class Practical {
        constructor(colors, randomNum, w, h, ctx, size) {
          this.size = randomNum(size) + 1;
          this.color = colors[randomNum(colors.length)];
          this.x = randomNum(w);
          this.y = randomNum(h);
          this.random = randomNum;
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
          this.offsetX =
            (this.random(6) + 1) * -(this.offsetX / Math.abs(this.offsetX));
          this.offsetY =
            (this.random(9) + 1) * -(this.offsetY / Math.abs(this.offsetY));
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
      canvas.style.background = this.background;
      this.initializeCanvas(ctx, canvas.width, canvas.height);
    },
    randomNum(n) {
      return Math.floor(Math.random() * n);
    },
    initializeCanvas(ctx, w, h) {
      ctx.clearRect(0, 0, w, h);
      for (let index = 0; index < this.practicalNumber; index++) {
        const current = new this.practical(
          this.colors,
          this.randomNum,
          w,
          h,
          ctx,
          this.size
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
      this.animation = setInterval(this.animate, this.speed);
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
