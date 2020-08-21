let ctx = document.getElementById('canvas').getContext('2d');
let rot_deg = 30;

function hex_corner(center, size, i) {
  let angle_deg = 60 * i - rot_deg;
  var angle_rad = Math.PI / 180 * angle_deg;
  let x = center.x + size * Math.cos(angle_rad);
  let y = center.y + size * Math.sin(angle_rad);
  return {x,y};
}
                 
function draw_pointy_hex(center,size) {
  ctx.beginPath();
  let point = hex_corner(center,size,0);
  ctx.moveTo(point.x,point.y);
  for (let i=0; i<7; i++) {
    point = hex_corner(center,size,i);
    ctx.lineTo(point.x,point.y);
  }
  ctx.stroke();
}

function pointy_hex_to_pixel(center,hex,size) {
  let sqrt32 = Math.sin(2*rot_deg * (Math.PI/180));
  let x = center.x + (size * (2 * sqrt32 * hex.q + sqrt32 * hex.r));
  let y = center.y + (size * (                        3/2 * hex.r));
  return {x,y};
}

function draw() {
  let size = 30;
  let range = 3;
  let center = {x:300,y:250};
  ctx.clearRect(0,0,500,500);
  for (let q = -range; q <= range; q++) {
    let radius = Math.abs(q) * size * Math.sqrt(3);
    ctx.beginPath();
    ctx.arc(center.x,center.y,radius,0,2*Math.PI);
    ctx.stroke();
    for (let r = -range; r <= range; r++) {
      if (Math.abs(q+r) <= range) {
        let phc = pointy_hex_to_pixel(center,{q,r},size);
        draw_pointy_hex(phc,size);
        ctx.strokeText(q+','+r,phc.x,phc.y);
      }
    }
  }
}

draw();