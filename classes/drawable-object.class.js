class DrawableObject {

    x = 70;
    img;
    imagesCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
   * 
   * @param {Array} imagesArray - ['img/image1.png, img/image2.png ....]
   */
    loadImages(imagesArray) {
        imagesArray.forEach((path) => {
            let img = new Image();
            img.src = path;
            // img.style = 'transform: scaleX(-1)';
            this.imagesCache[path] = img;
        });
    }

    /**
     * 
     * @param {Objects} ctx - to draw Frames around Objects
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Endboss || this instanceof Coins || this instanceof Bottles) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}