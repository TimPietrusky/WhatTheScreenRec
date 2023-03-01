# WhatTheScreenRec

Useful for generative art, where you want to show different outcomes of your work as the tool will reload the page, then take the screenshot / video. Each run will produce different results. 

Right now you have to update the code to set the URL or iterations or file-names or record duration. This might be changed in the future if I need this another time and I'm annoyed to set this via code :D

## Usage

```
## Generate a video
node index.js --video

## Generate screenshots, where each screenshot shows a different iteration
node index.js --screenshot

```