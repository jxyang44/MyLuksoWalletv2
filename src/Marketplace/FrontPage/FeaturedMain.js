import React from "react";
import Slider from "react-slick";
import { FeaturedMainItem } from "./";

const featuredItems = [
  {
    title: "Doodles",
    description: `a community driven collectible nft project by burnt toast, tulip, and poopie. `,
    button: "Visit Website",
    buttonLink: "https://doodles.app/",
    image: "https://media.giphy.com/media/88zFtljrXcHbhIhet8/giphy.gif",
  },
  {
    title: "BAYC",
    description: `A limited NFT collection where the token itself doubles as your membership to a swamp club for apes. The club is open! Ape in with us.`,
    button: "Visit Website",
    buttonLink: "https://boredapeyachtclub.com/#/",
    image: "https://media.giphy.com/media/1gbqIc1fK8QgR3bHL7/giphy.gif",
  },
];

const FeaturedMain = () => {
  const sliderSettings = {
    customPaging: i => {
      return <div>{featuredItems[i].title}</div>;
    },
    dots: true,
    dotsClass: "slick-dots",
    speed: 500,
    swipe: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    lazyLoad: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 10000,
    cssEase: "linear",
    pauseOnHover: true
  };

  return (
    <div className="w-full">
      <Slider {...sliderSettings}>
        {featuredItems.map((item, i) => {
          return(<FeaturedMainItem
          key={item+i}
            title={item.title}
            description={item.description}
            button={item.button}
            buttonFunc={() => window.open(item.buttonLink)}
            image={item.image}
          />);
        })}
      </Slider>
    </div>
  );
};

export default FeaturedMain;
