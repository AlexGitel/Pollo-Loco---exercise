class DrawableObject {

    x = 70;
    img;
    imagesCache = {};
    currentImage = 0;

    /**
     * 
     * @param {path of the Image} path  - like ['img/image1.png']
     */
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
            this.imagesCache[path] = img;
        });
    }


    // drawFrame(ctx) {
    //     if (this instanceof Character || this instanceof Endboss || this instanceof Coins || this instanceof Chicken || this instanceof ChickenSmall) {
    //         ctx.beginPath();
    //         ctx.lineWidth = '5';
    //         ctx.strokeStyle = 'blue';
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();
    //     }

    //     if (this instanceof Character || this instanceof Endboss || this instanceof Coins || this instanceof Chicken || this instanceof ChickenSmall) {
    //         ctx.beginPath();
    //         ctx.lineWidth = '2';
    //         ctx.strokeStyle = 'red';
    //         ctx.rect(
    //             this.x + this.offset.x,
    //             this.y + this.offset.y,
    //             this.width - this.offset.width,
    //             this.height - this.offset.height
    //         );
    //         ctx.stroke();
    //     }
    // }
}