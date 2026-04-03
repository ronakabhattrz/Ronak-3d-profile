/**
 * Route transition overlays were removed — animated full-screen layers caused
 * high CLS (Lighthouse). Page changes are instant; Framer Motion on each page
 * still handles local entrance animations.
 */
export default function Transition() {
  return null;
}
