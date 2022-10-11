<h1 align="center">Tailwind Color Picker</h1>

<p align="center">
  A chrome extension to pick any pixel from any website and copy the closest tailwind color to it.
</p>
<div align="center">

![tailwindcolorpicker](https://user-images.githubusercontent.com/63742054/191900590-9b674703-4795-4003-ae41-753cba581ed5.gif)

</div>

## Motivation

I built this to be used when quickly prototyping something and using other websites for inspiration. Having a color picker to quickly get tailwind colors from other sites helps me move quicker.

## How to use it locally

1. Run `git clone https://github.com/Nutlope/tailwind-color-picker`.
2. Go to `chrome://extensions`, enable developer mode at the top right, click "Load Unpacked", then select the dist folder.
3. Run 'CMD + Shift + X' to toggle the extension, or click it from the toolbar to activate it

## How to install

Coming soon to the chrome extension store!

## Todos

### v1

- [x] Get initial version working for regular color picker
- [x] Get it to show up on all sites and zoom appropriately
- [x] Add tailwind logic to choose closest color
- [x] Working v1!

### v2

- [x] Migrate to manifest v3
- [x] Add keyboard shortcut that automatically opens and closes extension
- [ ] Publish to the chrome store [in-progress]
- [ ] Make the color picker close after one select

## Credit

- Uses [any-color](https://github.com/hankchiutw/any-color) for the color picker
- Uses the [nearest-color](https://github.com/dtao/nearest-color) package to calculate the nearest tailwind color
- Uses tailwind colors from [nearestTailwindColor](https://github.com/zhigang1992/nearestTailwindColor/blob/master/colors.js)
