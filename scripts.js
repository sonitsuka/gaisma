import { format } from "string";

// Music Video
const videoId = window.location.href.split("/")[5];
const videoIdEncoded = encodeURIComponent(videoId);

// Get the thumbnail URL from the YouTube API.
const getThumbnailUrl = async () => {
  const response = await fetch(
    "https://www.youtube.com/get_video_info?video_id={}".format(videoIdEncoded)
  );
  if (response.status === 200) {
    const data = await response.json();
    return data["thumbnail_url"];
  } else {
    throw new Error("Unable to get YouTube thumbnail URL");
  }
};

// Get the thumbnail URL and update the image src attribute.
getThumbnailUrl().then((thumbnailUrl) => {
  thumbnail.src = thumbnailUrl;
});

// Handle mouse over event.
thumbnail.addEventListener("mouseover", function() {
  // Get the video title and description from the YouTube API.
  const getVideoInfo = async () => {
    const response = await fetch(
      "https://www.youtube.com/get_video_info?video_id={}".format(videoIdEncoded)
    );
    if (response.status === 200) {
      const data = await response.json();
      return {
        title: data["title"],
        description: data["description"],
      };
    } else {
      throw new Error("Unable to get YouTube video info");
    }
  };

  // Get the video title and description and update the div contents.
  getVideoInfo().then((videoInfo) => {
    const div = document.getElementById("video-info");
    div.innerHTML = `
      <h2>${videoInfo.title}</h2>
      <p>${videoInfo.description}</p>
    `;
  });
});

// Handle click event.
thumbnail.addEventListener("click", function() {
  // Get the YouTube video URL from the video ID.
  const videoUrl = "https://www.youtube.com/watch?v=" + videoIdEncoded;

  // Open the YouTube video in a new tab.
  window.open(videoUrl, "_blank");
});