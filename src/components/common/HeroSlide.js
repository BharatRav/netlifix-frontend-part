import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Chip, Stack, Typography, useTheme } from "@mui/material";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { routesGen } from "../../routes/routes";
import uiConfigs from "../../configs/ui.configs";
import CirculerRate from "./CirculerRate";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import genreApi from "../../api/modules/genre.api";
import mediaApi from "../../api/modules/media.api";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);


  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });

      console.log({response},"mediaType")
      if (response) setMovies(response.results);
      if (err) toast.error(err.message);
      dispatch(setGlobalLoading(false));
    };
    const getGenres = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await genreApi.getList({
        mediaType,
      });

      if (response) {
        setGenres(response.genres);
        getMedias();
      }
      if (err) {
        toast.error(err.message);
        setGlobalLoading(false);
      }
    };
    getGenres();
  }, [mediaType, mediaCategory, dispatch]);
  return (
    <Box
      sx={{
        position: "relative",
        color: "primary.contrastText",
        "&::before": {
          content: '""',
          width: "100%",
          height: "30%",
          position: "absolute",
          bottom: 0,
          left: 0,
          zIndex: 2,
          pointerEvents: "none",
          ...uiConfigs.style.gradientBgImage[theme.palette.mode],
        },
      }}
    >
      <Swiper
        grabCursor={true}
        loop={true}
        // modules={[Autoplay]}
        style={{ width: "100%", height: "max-content" }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {movies.map((movie, index) => {
          return (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  paddingTop: { xs: "130%", sm: "80%", md: "60%", lg: "45%" },
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  backgroundImage: `url(${tmdbConfigs.backdropPath(
                    movie.backdrop_path || movie.poster_path
                  )})`,
                }}
              ></Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default HeroSlide;
