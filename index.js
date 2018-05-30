let edgePips = [1, 3, 5, 7];
let pipColors = [
    "#FA573F",
    "#FF9900",
    "#FEE90B",
    "#CCDF00",
    "#88C440",
    "#00BBD5",
    "#0F93F5",
    "#9C5EBF",
    "#EB1160"
];
let columns = 3;
let spinnerRotate = 0;

class LoadingAnimation {
    constructor(domTarget, opts = {}) {
        const pipSize = opts.pipSize || 9;
        const size = pipSize * 5;
        let gridSpacing = pipSize * 2;
        let newPipDiv, newPip;

        this.target = domTarget;
        this.pips = [];
        this.started = false;

        this.loaderTime = 0;
        this.loader = document.createElement('div');
        this.loader.style.width  = `${size}px`;
        this.loader.style.height = `${size}px`;
        this.loader.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        this.loader.style.transform = "rotate(0deg)";
        this.loader.className = 'animation';
        for (let i = 0; i < 9; i++) {
            newPipDiv = document.createElement("div");
            newPipDiv.style.background = pipColors[i];
            newPipDiv.style.width  = `${pipSize}px`;
            newPipDiv.style.height = `${pipSize}px`;
            newPipDiv.style.borderRadius = `${pipSize * 0.555}px`;
            newPipDiv.style.transition = "transform 0.1s ease";
            newPipDiv.style.transform = `translate(${pipSize * 2}px, ${pipSize * 2}px)`;
            newPipDiv.style.position = "absolute";
            newPipDiv.className = 'pip';
            this.loader.appendChild(newPipDiv);
            newPip = {
                div: newPipDiv,
                x: (i % columns) * gridSpacing,
                y: Math.floor(i / 3) * gridSpacing,
            };
            this.pips.push(newPip);
            this.movePip(newPip);
        }
        this.target.appendChild(this.loader);
    }
    start() {
        if (this.started) {
            return;
        }
        this.started = true;
        this.animateTimeout = setTimeout(this.tick.bind(this), 500);
    }
    tick() {
        let toSwap = edgePips[Math.floor(Math.random() * edgePips.length) + 0];
        let possibleSwaps;
        switch (toSwap) {
            case 1:
                possibleSwaps = [0,4,2];
                this.swapPips(1, possibleSwaps[Math.floor(Math.random() * 2.9) + 0]);
            break;
            case 3:
                possibleSwaps = [0,4,6];
                this.swapPips(3, possibleSwaps[Math.floor(Math.random() * 2.9) + 0]);
            break;
            case 5:
                possibleSwaps = [2,4,8];
                this.swapPips(5, possibleSwaps[Math.floor(Math.random() * 2.9) + 0]);
            break;
            case 7:
                possibleSwaps = [6,4,8];
                this.swapPips(7, possibleSwaps[Math.floor(Math.random() * 2.9) + 0]);
            break;
        }
        if (this.loaderTime % 10 == 9) {
            spinnerRotate += 90;
            this.loader.style.transform = "rotate(" + spinnerRotate + "deg)";
        }
        this.loaderTime += 1;
        this.animateTimeout = setTimeout(this.tick.bind(this), 500);
    }
    movePip(pip) {
        pip.div.style.transform = "translate(" + pip.x + "px," + pip.y + "px)";
    }
    movePips() {
        for (let i = 0; i < this.pips.length; i++) {
            this.movePip(this.pips[i]);
        }
    }
    swapPips(pip1, pip2) {
        let pipStore = this.pips[pip1].div;
        this.pips[pip1].div = this.pips[pip2].div;
        this.pips[pip2].div = pipStore;
        this.movePips();
    }
    stop() {
        this.loaderTime = 0;
        clearTimeout(this.animateTimeout);
        this.started = false;
    }
    delete() {
        this.loader.parentNode.removeChild(this.loader);
        this.loader = null;
    }
}

export { LoadingAnimation };
