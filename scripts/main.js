
// ── INK RIPPLE — BLACK INK ON PARCHMENT ──
(function(){
  const container=document.getElementById('heroArea');
  const canvas=document.getElementById('rippleCanvas');
  const ctx=canvas.getContext('2d');

  let W,H,ripples=[];

  function resize(){
    W=container.offsetWidth;H=container.offsetHeight;
    canvas.width=W;canvas.height=H;
  }
  resize();
  window.addEventListener('resize',resize);

  class Ripple{
    constructor(x,y){
      this.x=x;this.y=y;
      this.r=0;this.maxR=Math.min(W,H)*0.6+Math.random()*100;
      this.speed=2.5+Math.random()*1.5;
      this.lineWidth=1.2;
      this.alpha=0.35+Math.random()*0.15;
    }
    update(){
      this.r+=this.speed;
      this.alpha*=0.993;
      return this.r<this.maxR&&this.alpha>0.005;
    }
    draw(){
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
      ctx.strokeStyle=`rgba(0,0,0,${this.alpha})`;
      ctx.lineWidth=this.lineWidth;
      ctx.stroke();
    }
  }

  function loop(){
    ctx.clearRect(0,0,W,H);
    ripples=ripples.filter(r=>{r.draw();return r.update();});
    requestAnimationFrame(loop);
  }
  loop();

  function addRipple(x,y){
    ripples.push(new Ripple(x,y));
    setTimeout(()=>ripples.push(new Ripple(x+8,y+6)),80);
    setTimeout(()=>ripples.push(new Ripple(x-5,y-4)),160);
  }

  container.addEventListener('click',e=>{
    const r=container.getBoundingClientRect();
    addRipple(e.clientX-r.left,e.clientY-r.top);
  });

  let moveTimer=0;
  container.addEventListener('mousemove',e=>{
    const now=Date.now();
    if(now-moveTimer<120)return;
    moveTimer=now;
    const r=container.getBoundingClientRect();
    ripples.push(new Ripple(e.clientX-r.left,e.clientY-r.top));
  });

  function ambient(){
    const x=W*0.3+Math.random()*W*0.4;
    const y=H*0.3+Math.random()*H*0.4;
    ripples.push(new Ripple(x,y));
    setTimeout(ambient,2000+Math.random()*3000);
  }
  setTimeout(ambient,1500);
})();
