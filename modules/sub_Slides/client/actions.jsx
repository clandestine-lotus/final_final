const NEXT_SLIDE = 'NEXT_SLIDE';
const PREV_SLIDE = 'PREV_SLIDE';

export function nextSlide() {
  return { 
    type: NEXT_SLIDE
  }
}

export function prevSlide() { 
  return { 
    type: PREV_SLIDE
  }
}
