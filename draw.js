// Load SPR files
let item_spr = new Image();
item_spr.src = "http://www.mysteralegacy.com/data/misc/item16.png?v=5.0.4";

let tile_spr = new Image();
tile_spr.src = "http://www.mysteralegacy.com/data/misc/tile16.png?v=5.0.4";

// Spritesheet Canvas
let spriteSheetCanvas = document.getElementById("sprite_sheet");
let spriteSheetContext = spriteSheetCanvas.getContext("2d");

// Sprite Canvas
let spriteCanvas = document.getElementById("sprite");
let spriteContext = spriteCanvas.getContext("2d");

// Config
let spriteSize = 80;
spriteCanvas.width = spriteSize;
spriteCanvas.height = spriteSize;
//

// Draw single Spr
function drawSpr(spr_file, spr, xMap = 0, yMap = 0){
  // clear
  spriteContext.clearRect(0, 0, spriteCanvas.width, spriteCanvas.height);

  let file;
  spr = parseInt(spr);

  if (spr_file === 'item_spr'){
    file = item_spr;
  }
  else if (spr_file === 'tile_spr'){
    file = tile_spr;
  }

  //
  let sprCount = 0;
  for (let y = 0; y < 64; y++){
    for (let x = 0; x < 16; x++){
      if (sprCount === spr){
        // (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        spriteContext.drawImage(file, 16*x, y*16, 16, 16, xMap * spriteSize, yMap * spriteSize, spriteSize, spriteSize);        
      }
      sprCount++;
    }
  }
}

// Draw the entire sheet
function drawSprSheet(spr_file){
  let file;

  if (spr_file === 'item_spr'){
    file = item_spr;
  }
  else if (spr_file === 'tile_spr'){
    file = tile_spr;
  }

  spriteSheetCanvas.width = file.width;
  spriteSheetCanvas.height = file.height;
  spriteSheetContext.clearRect(0, 0, spriteSheetCanvas.width, spriteSheetCanvas.height);
  spriteSheetContext.drawImage(file, 0, 0);
}

// Get sprite from mouse movement
function getSprFromMouse(event){
  let rect = spriteSheetCanvas.getBoundingClientRect();
  let trueX = event.clientX - rect.left;
  let trueY = event.clientY - rect.top;

  let sprX = Math.floor(trueX / 16);
  let sprY = Math.floor(trueY / 16);

  let spr = sprX + (sprY * 16);
  let file = document.getElementById('spr_file').value;

  // draw SPR
  drawSpr(file, spr);
  // update SPR number
  document.getElementById("spr_number").value = sprX + (sprY * 16);
}

// Listen to mouse movement
spriteSheetCanvas.addEventListener('mousemove', getSprFromMouse);