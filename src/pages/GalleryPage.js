import React from 'react';
import NavBar from '../components/NavBar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from '../components/Footer';
import GalleryImage2 from '../img/home_page_casual.jpg';
import GalleryImage3 from '../img/home _page_ tailored.jpg';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const GalleryPage = () => {

    const images = [
        {
          original: GalleryImage2,
          thumbnail: GalleryImage2
        },
        {
          original: GalleryImage2,
          thumbnail: GalleryImage2,
        },
        {
          original: GalleryImage3,
          thumbnail: GalleryImage3,
        },

        
        {
          original: GalleryImage3,
          thumbnail: GalleryImage3,
        },
      ];
      
    return (
        <>
            <NavBar></NavBar>
                <div className="GalleryPage">
                    <div className="HeaderGallery">
                        <h1>TAILORED </h1>
                    </div>
                    <ImageGallery className="images-gallery" items={images} />;
                    </div>

            <Footer></Footer>

        </>
    )
}
export default GalleryPage;