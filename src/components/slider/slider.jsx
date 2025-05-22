import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { IconButton } from "@mui/material";

function CustomLeftArrow({ onClick }) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        left: "-3rem",
        top: "40%",
        zIndex: 2,
      }}
    >
      <ArrowBackIos sx={{ color: "#B71C1C"}} />
    </IconButton>
  );
}

function CustomRightArrow({ onClick }) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        right: -2,
        top: "40%",
        zIndex: 100,
        color: "#fff",
      }}
    >
      <ArrowForwardIos sx={{ color: "#B71C1C"}} />
    </IconButton>
  );
}

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const { carouselState: { currentSlide } } = rest;
    return (
      <div className="carousel-button-group">
        <CustomLeftArrow className={currentSlide === 0 ? 'disable' : ''} onClick={() => previous()} />
        <CustomRightArrow onClick={() => next()} />
      </div>
    );
};

function Slider({ data, Template, toShow=4, action, responsiveOptions, carouselClass="carousel-item"}) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: toShow,
      slidesToSlide: 1,
    },
    mediumDesktop: {
      breakpoint: { max: 1024, min: 900 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 900, min: 768 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={false}
      responsive={responsiveOptions || responsive}
      ssr={true}
      infinite={window.innerWidth <= 700}
      arrows={false}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      transitionDuration={500}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass={carouselClass}
      centerMode={false}
      customButtonGroup={window.innerWidth >= 600 && <ButtonGroup />}
      renderButtonGroupOutside={true}
    >
      {data.map((card, idx) => (
        <Template key={idx} data={card} handleFavBtn={action} />
      ))}
    </Carousel>
  );
}

export default Slider;
