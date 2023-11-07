import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs";
import { routesGen } from "../../routes/routes";

const CastSlide = ({ casts }) => {
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: { xs: "50%", md: "25%", lg: "20.5%" },
          color: "primary.contrastText",
        },
      }}
    >
      <Swiper
        spaceBetween={10}
        slidesPerView={"auto"}
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
      >
        {casts.map((cast, index) => (
          <SwiperSlide key={index}>
            <Link to={routesGen.person(cast.id)}><Box color={"text.primary"} sx={{paddingTop:"120%",...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(cast.profile_path))}}></Box></Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CastSlide;
