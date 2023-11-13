import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid } from "@mui/material";
import MediaItem from "../components/common/MediaItem";
import Container from "../components/common/Container";
import uiConfigs from "../configs/ui.configs";
import favoriteApi from "../api/modules/favorite.api";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { removeFavorite } from "../redux/features/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const FavoriteItem = ({ media, onRemoved }) => {
  const dispatch = useDispatch();
  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;

    setOnRequest(true);
    const { response, err } = await favoriteApi.remove({
      favoriteId: media.id,
    });

    setOnRequest(false);

    if (err) toast.error(err.message);

    if (response) {
      toast.success("Remove favorite success");
      dispatch(removeFavorite({ mediaId: media.mediaId }));
      onRemoved(media.id);
    }
  };
  return (
    <>
      <MediaItem media={media} mediaType={media.mediaType} />
      <LoadingButton
        fullWidth
        variant="contained"
        sx={{ marginTop: 2 }}
        startIcon={<DeleteIcon />}
        loadingPosition="start"
        loading={onRequest}
        onClick={onRemove}
      >
        remove
      </LoadingButton>
    </>
  );
};

const FavoriteList = () => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();
  const skip = 8;

  useEffect(() => {
    const getFavorites = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await favoriteApi.getList();
      dispatch(setGlobalLoading(false));
      if (err) toast.error(err.message);

      if (response) {
        setCount(response.length);
        setMedias([...response]);
        setFilteredMedias([...response].splice(0, skip));
      }
    };
    getFavorites();
  }, [dispatch]);

  const onLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    const newMedias = [...medias].filter((e) => e.id !== id);
    setFilteredMedias([...newMedias].splice(0, page * skip));
    setCount(count - 1);
  };
  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your Favorites (${count})`}>
        <Grid container spacing={1} sx={{ marginRight: "-8px !important" }}>
          {filteredMedias.map((media, index) => (
            <Grid key={index} item xs={6} sm={4} md={4}>
              <FavoriteItem media={media} onRemoved={onRemoved} />
            </Grid>
          ))}
        </Grid>
        {filteredMedias.length < medias.length && (
          <Button onClick={onLoadMore}>load more</Button>
        )}
      </Container>
    </Box>
  );
};

export default FavoriteList;
