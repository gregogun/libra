import { ComponentProps, keyframes, styled } from "@aura-ui/react";

export const blue = "#00C8E5";
const white = "#fff";
const curve = "cubic-bezier(0.420, 0.000, 0.275, 1.155)";
const time = "1.4s";
export const confettiIndices = [1, 2, 3, 4, 5, 6];

export const rotate = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const grow = keyframes({
  "0%": { transform: "scale(0)" },
  "50%": { transform: "scale(1)" },
  "100%": { transform: "scale(0)" },
});

export const checkmark = keyframes({
  "0%": { opacity: 0, transform: "scale(0)" },
  "10%": { opacity: 1, transform: "scale(1)" },
});

export const StyledConfetti = styled("svg", {
  position: "absolute",
  animation: `${grow} ${time} ${curve} both`,

  variants: {
    index: {
      1: {
        width: "12px",
        height: "12px",
        left: "12px",
        top: "16px",
        animationDelay: `calc(1 * ${time} / 2)`,
      },
      2: {
        width: "18px",
        height: "18px",
        left: "168px",
        top: "84px",
        animationDelay: `calc(2 * ${time} / 2)`,
      },
      3: {
        width: "10px",
        height: "10px",
        left: "32px",
        top: "162px",
        animationDelay: `calc(3 * ${time} / 2)`,
      },
      4: {
        width: "20px",
        height: "20px",
        left: "96px",
        top: "-6px",
        animationDelay: `calc(4 * ${time} / 2)`,
      },
      5: {
        width: "14px",
        height: "14px",
        left: "125px",
        top: "162px",
        animationDelay: `calc(5 * ${time} / 2)`,
      },
      6: {
        width: "10px",
        height: "10px",
        left: "16px",
        top: "16px",
        animationDelay: `calc(6 * ${time} / 2)`,
      },
    },
  },
});

interface ConfettiProps {
  index: ComponentProps<typeof StyledConfetti>["index"];
}

export const Confetti = ({ index }: ConfettiProps) => (
  <StyledConfetti
    height="19"
    viewBox="0 0 19 19"
    width="19"
    xmlns="http://www.w3.org/2000/svg"
    index={index}
  >
    <path
      d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z"
      fill="currentColor"
    />
  </StyledConfetti>
);

export const StyledContainer = styled("div", {
  position: "relative",
  m: "auto",
  p: "$8",
  animation: `${checkmark} 5.6s ${curve} both`,
});

export const StyledCheckmark = styled("svg", {
  position: "absolute",
  top: "50%",
  left: "50%",
  zIndex: 10,
  transform: "translate3d(-50%, -50%, 0)",
  fill: white,
});

export const Checkmark = () => (
  <StyledCheckmark
    height="36"
    viewBox="0 0 48 36"
    width="48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M47.248 3.9L43.906.667a2.428 2.428 0 0 0-3.344 0l-23.63 23.09-9.554-9.338a2.432 2.432 0 0 0-3.345 0L.692 17.654a2.236 2.236 0 0 0 .002 3.233l14.567 14.175c.926.894 2.42.894 3.342.01L47.248 7.128c.922-.89.922-2.34 0-3.23" />
  </StyledCheckmark>
);

const StyledCheckmarkContainer = styled("svg", {
  animation: `${rotate} 28s linear both infinite`,
});

export const CheckmarkContainer = () => (
  <StyledCheckmarkContainer
    height="115"
    viewBox="0 0 120 115"
    width="120"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M107.332 72.938c-1.798 5.557 4.564 15.334 1.21 19.96-3.387 4.674-14.646 1.605-19.298 5.003-4.61 3.368-5.163 15.074-10.695 16.878-5.344 1.743-12.628-7.35-18.545-7.35-5.922 0-13.206 9.088-18.543 7.345-5.538-1.804-6.09-13.515-10.696-16.877-4.657-3.398-15.91-.334-19.297-5.002-3.356-4.627 3.006-14.404 1.208-19.962C10.93 67.576 0 63.442 0 57.5c0-5.943 10.93-10.076 12.668-15.438 1.798-5.557-4.564-15.334-1.21-19.96 3.387-4.674 14.646-1.605 19.298-5.003C35.366 13.73 35.92 2.025 41.45.22c5.344-1.743 12.628 7.35 18.545 7.35 5.922 0 13.206-9.088 18.543-7.345 5.538 1.804 6.09 13.515 10.696 16.877 4.657 3.398 15.91.334 19.297 5.002 3.356 4.627-3.006 14.404-1.208 19.962C109.07 47.424 120 51.562 120 57.5c0 5.943-10.93 10.076-12.668 15.438z"
      fill="currentColor"
    />
  </StyledCheckmarkContainer>
);
