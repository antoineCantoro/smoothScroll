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
        
        this.setBodyHeight();
        this.addEventListerners();
    }

    lerp (start, end, amt) {
        return (1 - amt) * start + amt * end;
    }

    setScrolledValue() {
        this.currentScroll = this.lerp(this.currentScroll, this.targetScroll, 0.1);
        this.DOM.container.style.transform = `translateY(-${ this.currentScroll }px)`;
        requestAnimationFrame(this.setScrolledValue.bind(this))
    }

    setBodyHeight() {
        document.body.style.height = this.containerHeight;
    }

    addEventListerners() {
        document.addEventListener("scroll", () => {
            this.targetScroll = window.scrollY;
        }, {passive: true})

        window.addEventListener("resize", () => {
            this.screenSizes.height = window.innerHeight;
            this.containerHeight = this.DOM.container.getBoundingClientRect().height;
            this.setBodyHeight();

        }, {passive: true})

        requestAnimationFrame(this.setScrolledValue.bind(this))
    }
}