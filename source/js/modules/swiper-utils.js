function setMaxSlideHeight(swiper) {
  if (!swiper || !swiper.slides || !swiper.slides.length) return;

  let maxHeight = 0;

  swiper.slides.forEach(slide => {
    slide.style.height = 'auto'; 
    const height = slide.offsetHeight;
    if (height > maxHeight) maxHeight = height;
  });

  swiper.slides.forEach(slide => {
    slide.style.height = `${maxHeight}px`;
  });
}

export { setMaxSlideHeight }