class Microphone {
    constructor() {
        this.initialised = false;
        navigator
            //get access to mic in laptop
            .mediaDevices.getUserMedia({ audio: true })
            //bring in audio web api
            .then(function (stream) {
                this.audioContext = new AudioContext();
                //takes raw audio data from mic and converts it into audio nodes
                this.microphone = this.audioContext.createMediaStreamSource(stream);
                //creates analyser node, which can be used to expose audio time and freq data to create visualization
                this.analyser = this.audioContext.createAnalyser();
                //slice audio into an dqual number of samples (bins), must be a power of 2 between 2^5 and 2^15, defaults to 2048
                this.analyser.fftSize = 1024;
                //freqBinCount is read only property and it is always equal to half of fftSize value
                const bufferLength = this.analyser.frequencyBinCount; //256 audio visual bars
                //convert audio data into 8-bit unsigned integers to make it wasier to manage (integers between 0 and 255)
                this.dataArray = new Uint8Array(bufferLength);
                //direct data from one audio node to another
                this.microphone.connect(this.analyser);
                this.initialised = true;
            }.bind(this))
            .catch(function (err) {
                alert(err);
            });
    }
    //returns an array of audio samples for visualisers
    getSamples() {
        //copies the current waveform or time domain data into an Uint8Array we pass to it
        //override the exisiting array with new audio information
        this.analyser.getByteTimeDomainData(this.dataArray)
        //normalise sample and spread them between -1 and +1
        let normSamples = [...this.dataArray].map(e => e / 128 - 1);
        return normSamples;
    }
    //returns a single average volume coming from the mic
    getVolume() {
        this.analyser.getByteTimeDomainData(this.dataArray)
        let normSamples = [...this.dataArray].map(e => e / 128 - 1);
        let sum = 0;
        for (let i = 0; i<normSamples.length; i++) {
            sum += normSamples[i] * normSamples[i]; //get rid of "-" sign
        }
        let volume = Math.sqrt(sum / normSamples.length);
        return volume;
    }
}

const microphone = new Microphone();