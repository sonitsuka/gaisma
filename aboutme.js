const photos = document.querySelectorAll(".img-fluid");

photos.forEach((photo, index) => {
  photo.style.animationDelay = `${index * 10}ms`;
  photo.addEventListener("load", () => {
    photo.style.opacity = "0";
    photo.classList.add("fade-in");
  });
});