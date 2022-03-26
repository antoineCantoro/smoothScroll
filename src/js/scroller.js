// example: https://codesandbox.io/s/ercqs?file=/src/index.js:1009-1015

import normalizeWheel from 'normalize-wheel';
import { clamp, lerp } from './utils';

export default class Scroller {

    constructor() {
        this.DOM = {};
        this.screenSizes = {};
        this.currentScroll = 0;
        this.targetScroll = 0;

        this.initScroller();
    }

    initScroller() {
        this.DOM.container = document.querySelector("[data-scroll-container]")
        this.screenSizes.height = window.innerHeight; 
        this.containerHeight = this.DOM.container.getBoundingClientRect().height;

        // this.DOM.container.style.transform = `translateY(-${  }px)`;

        // console.log();
        
        this.setBodyHeight();
        this.addEventListerners();
    }

    update() {
        this.currentScroll = lerp(this.currentScroll, this.targetScroll, 0.1);
        this.DOM.container.style.transform = `translateY(-${ this.currentScroll }px)`;
        requestAnimationFrame(this.update.bind(this))
    }

    setBodyHeight() {
        document.body.style.height = this.containerHeight;
    }

    addEventListerners() {

        window.addEventListener("wheel", (event) => {
            this.targetScroll += normalizeWheel(event).pixelY;
            this.targetScroll = clamp(this.targetScroll, 0.01, this.containerHeight - this.screenSizes.height)    
        }, {passive: true})

        window.addEventListener("resize", () => {
            this.screenSizes.height = window.innerHeight;
            this.containerHeight = this.DOM.container.getBoundingClientRect().height;
            this.setBodyHeight();
        }, {passive: true})

        requestAnimationFrame(this.update.bind(this))
    }
}