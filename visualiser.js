function main() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pumpkin = new Pumpkin(
        canvas.width / 2,
        canvas.height / 2,
        Math.min(canvas.width, canvas.height) * 0.4 //radius of pumpkin will be min of height.width
      );

    class Bar {
        constructor(x, y, width, height, color, index) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
            this.index = index;
        }
        update(micInput) {
            //animation where loud sounds make the bar height grow big very fast 
            //but slow down slowly
            const sound = micInput * 1000
            if (sound > this.height) {
                this.height = sound;
            } else {
                this.height -= this.height * 0.03;
            }
        }
        draw(context, volume) {
            context.strokeStyle = this.color;
            context.save();

            context.translate(0, 0);
            context.rotate(this.index * 0.03);
            context.scale(1+volume, 1+volume);

            context.beginPath();
            context.moveTo(this.x, this.y); //start from center
            context.lineTo(this.y, this.height);
            context.stroke();
            context.strokeRect(this.y, this.height, this.height/2, 5);

            context.restore();
        }
    }
    // const fftSize = 512;
    const microphone = new Microphone();
    let bars = [];
    let barWidth = canvas.width / (512/2);
    function createBars() {
        for (let i = 0; i < (512/2); i++) {
            let color = `hsl(${i*2}, 100%, 50%)`
            bars.push(new Bar(0, i*1.5, 5, 50, color, i));
        }
    }
    createBars();
    let angle = 0;
    let softVolume = 0; //gradual and less jumpy sequence
    
    function animate() {
        if (microphone.initialised) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            //generates audio samples from microphone
            const samples = microphone.getSamples();
            const volume = microphone.getVolumne();
            //animate bars based on microphone data
            angle -= 0.0001 + (volume*0.05);
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(angle);
            bars.forEach(function (bar, i) {
                bar.update(samples[i]);
                bar.draw(ctx, volume);
            });
            ctx.restore();
            softVolume = softVolume * 0.9 + volume * 0.1;
            const openness = softVolume * 7;
            pumpkin.draw(ctx, openness);
        
        }

        requestAnimationFrame(animate);
    }
    
    animate();
}

