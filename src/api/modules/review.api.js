import { Try } from "@mui/icons-material";
import privateClient from "../client/private.client";

const reviewEndpoints = {
  list: "reviews",
  add: "reviews",
  remove: ({ reviewId }) => `reviews/${reviewId}`,
};

const reviewApi = {
  add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, content }) => {
    try {
      const response = await privateClient.post(reviewEndpoints.add, {
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        content,
      });
      return { response };
    } catch (error) {
      return { err };
    }
  },
  remove: async ({ reviewId }) => {
    try {
      const response = await privateClient.delete(
        reviewEndpoints.remove({ reviewId })
      );
      return { response };
    } catch (error) {
      return { err };
    }
  },
  getList: async () => {
    try {
      const response = await privateClient.post(reviewEndpoints.list);
      return { response };
    } catch (error) {
      return { err };
    }
  },
};

export default reviewApi;
