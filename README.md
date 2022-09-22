<h1 align="center">Tailwind Color Picker</h1>

<p align="center">
  A chrome extension to pick any pixel from any website and copy the closest tailwind color to it.
</p>

## Motivation

I built this to be used when quickly prototyping something and using other websites for inspiration. Having a color picker to quickly get tailwind colors from other sites helps me move quicker.

## How to use

1. Run `git clone https://github.com/Nutlope/tailwind-color-picker`.
2. Go to `chrome://extensions`, enable developer mode at the top right, click "Load Unpacked", then select the dist folder.
3. Pin the extension to your toolbar, click on it to activate the color picker then click again to exit when you're done.

## Todos

### v1

- [x] Get initial version working for regular color picker
- [x] Get it to show up on all sites and zoom appropriately
- [x] Add tailwind logic to choose closest color
- [x] Working v1!

### v2

- [ ] Make the color picker close after one select
- [ ] Add keyboard shortcut so you don't need to manually click it again to close
- [ ] Migrate to manifest v3 & publish to the chrome store

## Credit

- Uses [any-color](https://github.com/hankchiutw/any-color) for the color picker
- Uses the [nearest-color](https://github.com/dtao/nearest-color) package to calculate the nearest tailwind color
- Uses tailwind colors from [nearestTailwindColor](https://github.com/zhigang1992/nearestTailwindColor/blob/master/colors.js)
