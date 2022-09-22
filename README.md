# Tailwind Color Picker

A chrome extension to pick any pixel from any website and find the closest tailwind color to it.

## Todos

- [x] Get initial version working
- [ ] Make the color picker close after one select
- [ ] Migrate to manifest v3
- [ ] Add a keyboard shortcut work
- [ ] Publish to chrome store
- [ ] Post on Twitter

## How to use

1. Git clone the repo
2. Go to chrome://extesions and click "Load UnPacked", then select the dist folder
3. Pin it to your toolbar, click on it to activate the color picker then click again to exist

## Credit

- Uses [any-color](https://github.com/hankchiutw/any-color) for the color picker
- Uses the [nearest-color](https://github.com/dtao/nearest-color) package to calculate the nearest tailwind color
- Uses tailwind colors from [nearestTailwindColor](https://github.com/zhigang1992/nearestTailwindColor/blob/master/colors.js)
