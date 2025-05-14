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
}