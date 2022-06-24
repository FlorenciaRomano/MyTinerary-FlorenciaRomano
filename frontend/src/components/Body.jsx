
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Data from "../data"
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/index.css";

// import required modules
import {Autoplay, Grid,Pagination, Navigation } from "swiper";

export default function Carousel() {
  return (
    <>
    <div className="ContainerCarousel">
      <Swiper
        slidesPerView={2}
        
        slidesPerGroup={2}
        spaceBetween={10}
        grid={{rows:2}}
        rows={2}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            
            slidesPerGroup:2,
            slidesPerView: 2,
            grid: {
              column: 1,
            rows:2}
            
          },
          768: {
            slidesPerView: 2,
            slidesPerGroup:2,
            spaceBetween: 10,
            grid: {
              rows: 2}
          },
          1024: {
            slidesPerView: 2,
            slidesPerGroup:2,
            spaceBetween: 20,
            grid: {
            rows: 2}
            }
          
        }}
        
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Grid, Pagination, Navigation]}
        className="mySwiper">
        {Data.map(pais => 
        <SwiperSlide className="cardSw" key={pais.id} style={{
          "backgroundImage":`url(${pais.image})`,
          "backgroundSize":"cover",
          "backgroundPosition": "center"
        }}>
          
          <div className="caja">
            <p>{pais.city}</p>
          </div>
          </SwiperSlide>
      ) }
      </Swiper>
    
      </div>
    </>
  );
}




<video id="pageBackground_cfvg_video" class="_3vVMz" role="presentation" crossorigin="anonymous" playsinline="" preload="auto" loop="" tabindex="-1" width="100%" height="100%" autoplay="" src="https://video.wixstatic.com/video/11062b_46d3e749db4d4169987b00279493eaa7/1080p/mp4/file.mp4" style="width: 100%; height: 100%; object-fit: cover; object-position: center center; opacity: 1;"></video>