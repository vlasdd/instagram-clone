const compareSize = (src: string): boolean => {
    const image = document.createElement("img");
    image.src = src;

    console.log("height, width:", image.naturalHeight, image.naturalWidth)
    if (image.naturalHeight > image.naturalWidth) {
        return true;
    }
    return false
}

export default compareSize