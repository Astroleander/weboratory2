<template>
  <button class="component-button draw">{{ name }}</button>
</template>

<script>
export default {
  props: ["name"],
};
</script>

<style lang="scss" scoped>
.draw {
  padding: 0.7em 2em;

  // Using inset box-shadow instead of border for sizing simplicity
  box-shadow: inset 0 0 0 2px var(--secondary-bg);
  // Required, since we're setting absolute on pseudo-elements
  position: relative;
  transition: color 0.25s ease-out;
  &:hover {
    color: var(--accent-color);
  }
  &:active:hover {
    color: var(--primary-color);
    box-shadow: inset 0 0 0 2px var(--primary-color);
    transition: none;
    &::before, &::after {
      width: 0;
      height: 0;
      transition: all 0s;
    }
  }
  // vertical-align: middle;
  &::before,
  &::after {
    // Set border to invisible, so we don't see a 4px border on a 0x0 element before the transition starts
    border: 2px solid transparent;
    position: absolute;
    content: "";
    box-sizing: inherit;
    width: 0;
    height: 0;
  }
  // This covers the top & right borders (expands right, then down)
  &::before {
    top: 0;
    left: 0;
  }
  // And this the bottom & left borders (expands left, then up)
  &::after {
    bottom: 0;
    right: 0;
  }
  // ============= hover =============
  &:hover::before,
  &:hover::after {
    width: 100%;
    height: 100%;
  }
  &:hover::before {
    border-top-color: var(--accent-color); // Make borders visible
    border-right-color: var(--accent-color);
    transition: width 0.25s ease-out,
      // Width expands first
      height 0.25s ease-out 0.25s; // And then height
  }
  &:hover::after {
    border-bottom-color: var(--accent-color); // Make borders visible
    border-left-color: var(--accent-color);
    transition: border-color 0s ease-out 0.5s,
      // Wait for ::before to finish before showing border
      width 0.25s ease-out 0.5s,
      // And then exanding width
      height 0.25s ease-out 0.75s; // And finally height
  }
}
</style>
