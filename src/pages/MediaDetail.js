import React, { useEffect, useRef, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Chip,
  Divider,
  STack,
  Stack,
  Typography,
} from "@mui/material";

import CirculerRate from "../components/common/CirculerRate";
import Container from "../components/common/Container";
import ImageHeader from "../components/common/ImageHeader";
import uiConfigs from "../configs/ui.configs";
import tmdbConfigs from "../api/configs/tmdb.configs";
import mediaApi from "../api/modules/media.api";
import favoriteApi from "../api/modules/favorite.api";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { addFavorite, removeFavorite } from "../redux/features/userSlice";
import { toast } from "react-toastify";
const MediaDetail = () => {
  const { mediaType, mediaId } = useParams();

  const { user, listFavorites } = useSelector((state) => state.user);
  const [media, setMedia] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const [genres, setGenres] = useState([]);
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  useEffect(() => {
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await mediaApi.getDetail({
        mediaType,
        mediaId,
      });
      dispatch(setGlobalLoading(false));

      if (response) {
        setMedia(response);
        setIsFavorite(response.isFavorite);
        setGenres(response.genres.splice(0, 2));
      }
      if (err) toast.error(err.message);
    };
    getMedia();
  }, [mediaType, mediaId, dispatch]);
  return media ? (
    <>
      <ImageHeader
        imgPath={tmdbConfigs.backdropPath(
          media.backdrop_path || media.poster_path
        )}
      />
      <Box
        sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent,
        }}
      >
        {/* media content */}
        <Box
          sx={{
            marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
            }}
          >
            {/* poster */}
            <Box
              sx={{
                width: { xs: "70%", sm: "50%", md: "40%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
              }}
            >
              <Box
                sx={{
                  paddingTop: "140%",
                  ...uiConfigs.style.backgroundImage(
                    tmdbConfigs.posterPath(
                      media.poster_path || media.backdrop_path
                    )
                  ),
                }}
              />
            </Box>
            {/* poster */}
            {/* media info */}
            <Box
              sx={{ width: { xs: "100%", md: "60%" }, color: "text.primary" }}
            >
              <Stack spacing={5}>
                {/* title */}
                <Typography
                  variant="h4"
                  fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                  fontWeight={700}
                  sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                >{`${media.title || media.name} ${
                  mediaType === tmdbConfigs.mediaType.movie
                    ? media.release_date.split("-")[0]
                    : media.first_air_date.split("-")[0]
                }`}</Typography>
                {/* title */}
                {/* rate and genres */}
                <Stack direction={"row"}></Stack>
                {/* rate and genres */}
              </Stack>
            </Box>
            {/* media info */}
          </Box>
        </Box>
        {/* media content */}
      </Box>
    </>
  ) : null;
};

export default MediaDetail;
