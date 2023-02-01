<h1 align="center"><a href="https://chrome.google.com/webstore/detail/tailwind-color-picker/iaknbjonlhaajcfpfcimahgpfknpihfm">Tailwind Color Picker</a></h1>

<p align="center">
  A chrome extension to pick a pixel from any website and copy the closest tailwind color to it.
</p>
<div align="center">

![tailwindcolorpicker](https://user-images.githubusercontent.com/63742054/191900590-9b674703-4795-4003-ae41-753cba581ed5.gif)

</div>

## How to install

Install the [official Chrome Extension](https://chrome.google.com/webstore/detail/tailwind-color-picker/iaknbjonlhaajcfpfcimahgpfknpihfm) today!

## Motivation

I built this to be used when quickly prototyping something and using other websites for inspiration. Having a color picker to quickly get tailwind colors from other sites helps me move quicker.

## How to use it locally

1. Run `git clone https://github.com/Nutlope/tailwind-color-picker`.
2. Go to `chrome://extensions`, enable developer mode at the top right, click "Load Unpacked", then select the dist folder.
3. Run 'CMD + Shift + X' to toggle the extension, or click it from the toolbar to activate it

## How to develop locally

1. Run `git clone https://github.com/Nutlope/tailwind-color-picker`.
2. Run `cd tailwind-color-picker && yarn install`
3. Run `npm run start`

## Credit

- Uses [any-color](https://github.com/hankchiutw/any-color) for the color picker
- Uses the [nearest-color](https://github.com/dtao/nearest-color) package to calculate the nearest tailwind color
- Uses tailwind colors from [nearestTailwindColor](https://github.com/zhigang1992/nearestTailwindColor/blob/master/colors.js)
