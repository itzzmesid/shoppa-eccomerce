import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {
    const [Images, setImages] = useState([])
    console.log('props',props)
    useEffect(() => {
            let images = [];
            props?.ProductDetail?.productPictures?.map(item => {
                console.log('  hellooo    ',item)
                images.push({
                    original: item.img,
                    thumbnail:item.img
                })
            })
            setImages(images)
        
        console.log('pi',Images)
    }, [props.ProductDetail])

    return (
        <div>
            <ImageGallery slideOnThumbnailOver infinite thumbnailPosition='left'
                showBullets={false} showNav={false} showPlayButton={false} showFullscreenButton={false} items={Images} />
        </div>
    )
}

export default ProductImage