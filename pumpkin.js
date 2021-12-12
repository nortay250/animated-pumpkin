class Pumpkin {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.rad = rad;
  }
  draw(ctx, openness) {
    ctx.save();
    ctx.translate(this.x, this.y); //move to middle
    ctx.scale(this.rad, this.rad);

    this.#drawHeader(ctx, openness);
    this.#drawEyes(ctx, openness); //only scale the eyes vertically opposite the mouth slightly
    this.#drawNose(ctx, openness); //the more open the mough is the more up the nose moves
    this.#drawMouth(ctx, openness); //only scale the mouth vertically

    ctx.restore();
  }

  #drawMouth(ctx, openness) {
    ctx.fillStyle = "black";
    ctx.save();
    ctx.translate(0, 0.3);
    ctx.scale(1-openness*0.2, openness + 0.2); //preserve surface area

    //rhombus mouth
    ctx.moveTo(-0.6, 0);
    ctx.lineTo(-0.4, -0.17); //zigzag line up
    ctx.lineTo(-0.2, -0.08); //zigzag line down
    ctx.lineTo(0, -0.2);
    ctx.lineTo(0.2, -0.08); //zigzag line down
    ctx.lineTo(0.4, -0.17); //zigzag line up
    ctx.lineTo(0.6, 0);
    ctx.lineTo(0.4, 0.17); //zigzag line down
    ctx.lineTo(0.2, 0.08); //zigzag line up
    ctx.lineTo(0, 0.2);
    ctx.lineTo(-0.2, 0.08); //zigzag line up
    ctx.lineTo(-0.4, 0.17); //zigzag line down
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  #drawNose(ctx, openness) {
    //black triangular drawEyes
    //left nostril
    ctx.save();
    ctx.translate(-0.06, -openness*0.05);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(-0.03, 0);
    ctx.lineTo(0.03, -0.03);
    ctx.lineTo(0.03, 0.03);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    //right nostril
    ctx.save();
    ctx.translate(0.06, -openness*0.05);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(0.03, 0);
    ctx.lineTo(-0.03, -0.03);
    ctx.lineTo(-0.03, 0.03);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  #drawEyes(ctx, openness) {
    //black triangular drawEyes
    //left eye
    ctx.save();
    ctx.translate(-0.4, -0.4);
    ctx.scale(1+openness*0.3, 1.2-openness)

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(-0.1, 0);
    ctx.lineTo(0.1, -0.1);
    ctx.lineTo(0.1, 0.1);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    //right eye
    ctx.save();
    ctx.translate(0.4, -0.4);
    ctx.scale(1+openness*0.3, 1.2-openness)

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(0.1, 0);
    ctx.lineTo(-0.1, -0.1);
    ctx.lineTo(-0.1, 0.1);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  #drawHeader(ctx, openness) {
    //stem of pumpkin
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.rect(-0.05, -1, 0.1, 0.1);
    ctx.fill();

    //head of pumpkin to be made of ellipses
    ctx.fillStyle = "rgb(255, 150, 0)"; //most left
    ctx.beginPath();
    ctx.ellipse(-0.6, 0.03, 0.4, 0.92, -openness*0.1, 0, Math.PI * 2); //x, y, x radius, y radius, rotation, start angle, end angle
    ctx.fill();

    ctx.fillStyle = "rgb(255, 150, 0)"; //most right
    ctx.beginPath();
    ctx.ellipse(0.6, 0.03, 0.4, 0.92, openness*0.1, 0, Math.PI * 2); //x, y, x radius, y radius, rotation, start angle, end angle
    ctx.fill();

    ctx.fillStyle = "rgb(255, 170, 0)"; //left
    ctx.beginPath();
    ctx.ellipse(-0.3, 0.03, 0.4, 0.95, -openness*0.05, 0, Math.PI * 2); //x, y, x radius, y radius, rotation, start angle, end angle
    ctx.fill();

    ctx.fillStyle = "rgb(255, 170, 0)"; //right
    ctx.beginPath();
    ctx.ellipse(0.3, 0.03, 0.4, 0.95, openness*0.05, 0, Math.PI * 2); //x, y, x radius, y radius, rotation, start angle, end angle
    ctx.fill();

    ctx.fillStyle = "rgb(255, 190, 0)"; //middle
    ctx.beginPath();
    ctx.ellipse(0, 0.03, 0.4, 0.97, 0, 0, Math.PI * 2); //x, y, x radius, y radius, rotation, start angle, end angle
    ctx.fill();
  }
}
