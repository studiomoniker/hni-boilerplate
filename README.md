# HNI Web Cover Boilerplate

> A boilerplate for developing web covers for hetnieuweinstituut.nl

## Boilerplate Features

- Automatically transpiles ES6+ javascript using [Babel](https://babeljs.io/)
- Uses [SASS](http://sass-lang.com/) for CSS
- Produces [vendor prefixed](http://webdesign.about.com/od/css/a/css-vendor-prefixes.htm) CSS using [Autoprefixer](https://github.com/postcss/autoprefixer)
- Inlines minified javascript and css when deploying
- Watches for changes to your source files and recompiles the cover automatically
- Javascript is included at the bottom of the page, so there is no need to wait for [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) events (That's `$(document).ready()` for jQuery users).

## Required Dependencies

To use this boilerplate your machine needs to have Node.js installed:

- Install [Node.js](https://nodejs.org/en/download/)

## Boilerplate Installation

1. To download the boilerplate click on `Download ZIP` or clone this git repository.
2. Open Terminal.app and go to the cover directory: `cd /path/to/cover/directory` or drag the cover folder onto the Terminal icon.
4. Run `npm install` to install the necessary dependencies
5. Run `npm start` to build the cover and start a development server
6. Your browser will open a new tab/window with the cover!

## Usage

- Whenever you work on the cover, open up a Terminal window, cd to the cover directory (as explained in installation) and run the `npm start` command to start building the files. This will concatenate the javascript files to a single javascript file and convert the SASS code to vendor-prefixed css. It will rebuild automatically, whenever a file is edited.
- You might want to clean out the files in the `/src/assets` folders and the styles in `/src/styles/_default.scss`. More on this later (see _Locations_).
- To create the zip file to send to The New Institute, run `npm run package`.

> __Disclaimer__: Packaging has only been tested on macOS. In case it does not work, you can package manually by running `npm run build` in the Terminal.app. This should create a `dist` directory. Now create an archive/zip of everything inside the `dist` folder. You now have a package ready to send to The New Institute 

## Locations

- __All__ files located in `/src/assets` will be automatically copied. This is where you want to put images, fonts, audio files or other assets.
- `index.html` is located in `/src`
- SASS is located in `/src/styles`. The main entry point is `index.scss`.
- Javascript is located in `/src/scripts`. The main entry point is `index.js` but you should put all your custom code in `app.js`.
- By default we import `/src/lib/message.js`, which is used to make the cover clickable on the homepage, to send users to the web magazine.
- Proxy images are located in `/proxy-images`. Edit the `settings.ini` file to point to the correct filenames (!)

## Fallback images

On mobile devices we unfortunately have to fallback to the use of images. You can see example images the `proxy-images` folder. Make sure your replacements images have the same resolution and filename!

## Testing

To test your cover you can go to `http://localhost:8080/iframe-test`. The URL might be different, depending on what port your development server is running. If you resize the browser window or use the mobile device emulator you can check the fallback images.

## Credits

This boilerplate is a heavily modified version of [tris-webpack-boilerplate](https://github.com/tr1s/tris-webpack-boilerplate).