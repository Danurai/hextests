let ctx = document.getElementById('canvas').getContext('2d');

function hex_corner(center, size, i, rot_deg) {
  let angle_deg = 60 * i + (rot_deg - 30);
  var angle_rad = Math.PI / 180 * angle_deg;
  let x = center.x + size * Math.cos(angle_rad);
  let y = center.y + size * Math.sin(angle_rad);
  return {x,y};
}
                 
function draw_hex(center,size,rot_deg) {
  ctx.beginPath();
  let point = hex_corner(center,size,0,rot_deg);
  ctx.moveTo(point.x,point.y);
  for (let i=0; i<7; i++) {
    point = hex_corner(center,size,i,rot_deg);
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

function hex_to_pixel(center,hex,size,rot_deg) {
  let rot_rad = rot_deg * (Math.PI/180);
  let sqrt3 = Math.sqrt(3);
  let x = size * (sqrt3 * hex.q + sqrt3/2 * hex.r);
  let y = size * (                    3/2 * hex.r);
  
  let h = Math.sqrt(x*x + y*y);
  let alpha = Math.abs(x+y) > 0 ? Math.atan(y/x) : 0;
  
  x = center.x + (h * Math.cos(alpha + rot_rad));
  y = center.y + (h * Math.sin(alpha + rot_rad));
  
  return {x,y};
}

$('#rot').on('input',function () {
  draw(this.value);
});

function draw(rot_deg) {
  let size = 30;
  let range = 1;
  let center = {x:200,y:200};
  
  ctx.clearRect(0,0,500,500);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  
  for (let q=-range; q<=range; q++) {
    for (let r=0; r<=0; r++) {
      if (Math.abs(q+r)<=range) {
        let phc = hex_to_pixel(center,{q,r},size,rot_deg);
        console.log ({q,r},phc);
        draw_hex(phc,size,rot_deg);
        ctx.strokeText(addsign(q)+','+addsign(r),phc.x,phc.y);
      }
    }
  }
  
}

function addsign(n) {
  return (n>0?'+'+n:n);
}

draw(0);