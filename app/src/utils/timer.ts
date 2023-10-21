// @ts-nocheck
function easeInQuart(currentTime, startValue, changeInValue, duration) {
  currentTime /= duration;
  return changeInValue * currentTime * currentTime * currentTime * currentTime + startValue;
}

export function animateProperty(startValue, toValue, duration) {
  return new Promise((resolve) => {
    const startTime = Date.now();

    function animationStep() {
      const currentTime = Date.now() - startTime;

      if (currentTime < duration) {
        const newValue = easeInQuart(currentTime, startValue, toValue - startValue, duration);
        

        // Continue the animation loop
        setTimeout(animationStep, 1000 / 60); // 60 frames per second (change as needed)
      } else {
        resolve();
      }
    }

    animationStep(); // Start the animation loop
  });
}