module.exports = class Reloj {
  constructor(h, m, s) {
    this.h = h;
    this.m = m;
    this.s = s;
    this.v = 1000;
    this.p = false;
  }

  hora() {
    setInterval(() => {
      if (!this.p) {
        if (this.s < 59) {
          this.s += 1;
        } else if (this.m < 59) {
          this.s = 0;
          this.m += 1;
        } else if (this.h < 23) {
          this.s = 0;
          this.m = 0;
          this.h += 1;
        } else {
          this.h = 0;
          this.m = 0;
          this.s = 0;
        }
      }
      console.log(this.h, this.m, this.s);
    }, this.v);
  }
};
