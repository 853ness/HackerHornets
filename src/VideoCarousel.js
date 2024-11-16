import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const VideoCarousel = () => {
  // Array of video URLs (replace these with your desired videos)
  const videoData = [
    {
      title: "Introduction to Algorithms",
      url: "https://www.youtube.com/embed/8hly31xKli0",
    },
    {
      title: "Computer Networking Basics",
      url: "https://www.youtube.com/embed/3QhU9jd03a0",
    },
    {
      title: "Data Structures Crash Course",
      url: "https://www.youtube.com/embed/bum_19loj9A",
    },
    {
      title: "Machine Learning Basics",
      url: "https://www.youtube.com/embed/GwIo3gDZCVQ",
    },
    {
      title: "Operating Systems Introduction",
      url: "https://www.youtube.com/embed/26QPDBe-NB8",
    },
    {
      title: "Database Management Systems",
      url: "https://www.youtube.com/embed/hC3Xt68m3bA",
    },
    {
      title: "Software Engineering Principles",
      url: "https://www.youtube.com/embed/RmXwBx2f3cA",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div style={{ margin: "20px" }}>
      <Slider {...settings}>
        {videoData.map((video, index) => (
          <div key={index} style={{ padding: "10px" }}>
            <iframe
              title={video.title}
              width="100%"
              height="200"
              src={video.url}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h4 style={{ textAlign: "center" }}>{video.title}</h4>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VideoCarousel;
