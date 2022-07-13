import React from 'react'

type GalleryDropMenuProps = {
  images: any[], 
  setImage: React.Dispatch<React.SetStateAction<any[]>>,
  currentImageIndex: number
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>,
}

const GalleryDropMenu: React.FC<GalleryDropMenuProps> = ({ images, setImage, currentImageIndex, setCurrentImageIndex}) => {
  return (
    <div className="h-24 flex p-3">
      {
        images.map((image, index) => (
          <div
            className="relative z-10 w-full h-full aspect-square cursor-pointer rounded-sm"
            onClick={() => setCurrentImageIndex(index)}
            key={image}
          >
            <img
              src={URL.createObjectURL(image)}
              className={`h-full w-full object-cover rounded-sm bg-red-800`}
            />
          </div>
        ))
      }
    </div>
  )
}

export default GalleryDropMenu