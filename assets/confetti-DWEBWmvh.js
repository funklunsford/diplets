import{t as e}from"./index-BsWRKlMv.js";function t(e){return()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}new Set(Object.keys(e).filter(t=>e[t].parts.length===1));var n=e=>Math.min(1,Math.max(0,e)),r=(e,t,r)=>{let i=n((r-e)/(t-e));return i*i*(3-2*i)},i={length:3.2},a=3,o=2.4,s=.97;function c(e,{small:c,sources:l}){let u=t(83),d={h:0,s:0,l:0},f=t=>(t.getHSL(d,e.SRGBColorSpace),t.setHSL(d.h,Math.max(d.s,.6),Math.min(.64,Math.max(d.l,.55)),e.SRGBColorSpace)),p=[`#ffc21a`,`#ff5e8a`,`#ffffff`,`#4fc3ff`].map(t=>new e.Color(t)),m=l.length?l:[{x:0,y:0,color:[.9,.6,.2]}],h=()=>m[Math.floor(u()*m.length)],g=m.map(e=>e.x),_=m.map(e=>e.y),v={x:(Math.min(...g)+Math.max(...g))/2,y:(Math.min(..._)+Math.max(..._))/2},y=Math.max(.12,(Math.max(...g)-Math.min(...g))/2),b=c?150:240,x=Array.from({length:b},(t,n)=>{let r=h(),i=n<b*.7,a=u()<.85?Math.PI/2+(u()-.5)*2.9:u()*6.28,o=i?2.6+2.8*u():1.4+1.6*u(),s=u()*2-1,c=1+.35*s,[l,d,m]=[u()-.5,u()-.5,u()-.5],g=Math.hypot(l,d,m)||1,_=u()<.18,v=_?.018+.01*u():.026+.026*u();return{x:r.x,y:r.y,z:s,near:c,born:i?.06*u():.12+.3*u(),vx:Math.cos(a)*o*c,vy:Math.sin(a)*o*c,axis:new e.Vector3(l/g,d/g,m/g),spin:5+9*u(),phase:u()*6.28,sway:.03+.06*u(),swayRate:4+4*u(),w:v,h:_?v:v*(.4+.3*u()),dot:_,color:u()<.72?f(new e.Color().setRGB(...r.color,e.SRGBColorSpace)):p[Math.floor(u()*p.length)].clone()}}),S=new e.PlaneGeometry(1,1);S.setAttribute(`aDot`,new e.InstancedBufferAttribute(new Float32Array(x.map(e=>+!!e.dot)),1));let C=new e.InstancedMesh(S,new e.ShaderMaterial({vertexShader:`
        attribute float aDot;
        varying vec2 vUv;
        varying vec3 vColor;
        varying float vLight;
        varying float vGlint;
        varying float vBack;
        varying float vDot;
        void main() {
          vUv = position.xy;
          vColor = instanceColor;
          vDot = aDot;
          vec3 n = normalize(mat3(instanceMatrix) * vec3(0.0, 0.0, 1.0));
          float d = dot(n, normalize(vec3(-0.35, 0.6, 0.72)));
          vLight = 0.62 + 0.38 * abs(d);
          vGlint = pow(abs(d), 30.0);
          vBack = step(d, 0.0);
          gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
        }`,fragmentShader:`
        varying vec2 vUv;
        varying vec3 vColor;
        varying float vLight;
        varying float vGlint;
        varying float vBack;
        varying float vDot;
        void main() {
          if (vDot > 0.5 && length(vUv) > 0.5) discard;
          vec3 color = vColor * vLight * (1.0 - 0.18 * vBack) + vec3(0.7 * vGlint);
          gl_FragColor = vec4(color, 1.0);
          #include <colorspace_fragment>
        }`,side:e.DoubleSide}),b);x.forEach((e,t)=>C.setColorAt(t,e.color)),C.instanceMatrix.setUsage(e.DynamicDrawUsage);let w=new e.Mesh(new e.PlaneGeometry(2,2),new e.ShaderMaterial({uniforms:{uLife:{value:0}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = position.xy;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,fragmentShader:`
        uniform float uLife;
        varying vec2 vUv;
        void main() {
          float r = length(vUv);
          float width = mix(0.22, 0.04, uLife);
          float band = 1.0 - smoothstep(0.0, width, abs(r - (1.0 - width)));
          float glow = (1.0 - smoothstep(0.0, 0.9, r)) * 0.35 * (1.0 - uLife);
          gl_FragColor = vec4(vec3(1.0, 0.8, 0.3), clamp(band + glow, 0.0, 1.0) * (1.0 - uLife));
          #include <colorspace_fragment>
        }`,transparent:!0,depthTest:!1,depthWrite:!1})),T=c?18:30,E=Array.from({length:T},()=>{let t=h(),n=u()*6.28,r=.05+.3*u();return{x:t.x+Math.cos(n)*r,y:t.y+Math.sin(n)*r+.2*u(),at:.05+2.2*u(),life:.35+.4*u(),size:.03+.04*u(),turn:u()*6.28,color:new e.Color(u()<.5?`#fff6dc`:`#ffd36a`)}}),D=new e.InstancedMesh(new e.PlaneGeometry(2,2),new e.ShaderMaterial({vertexShader:`
        varying vec2 vUv;
        varying vec3 vColor;
        void main() {
          vUv = position.xy;
          vColor = instanceColor;
          gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
        }`,fragmentShader:`
        varying vec2 vUv;
        varying vec3 vColor;
        void main() {
          float r = length(vUv);
          float rays = max(0.0, 1.0 - abs(vUv.x * vUv.y) * 22.0) * max(0.0, 1.0 - r);
          float glow = exp(-r * r * 14.0);
          gl_FragColor = vec4(vColor, clamp(rays * rays + glow, 0.0, 1.0));
          #include <colorspace_fragment>
        }`,transparent:!0,depthTest:!1,depthWrite:!1}),T);E.forEach((e,t)=>D.setColorAt(t,e.color)),D.instanceMatrix.setUsage(e.DynamicDrawUsage);let O=[C,w,D];O.forEach((e,t)=>{e.frustumCulled=!1,e.renderOrder=t});let k=new e.Matrix4,A=new e.Quaternion,j=new e.Vector3(0,0,1),M=new e.Vector3,N=new e.Vector3,P=new e.Matrix4().makeScale(0,0,0),F=(e,t)=>{let c=t*s,l=e=>c*Math.tanh(e/c),u=Math.max(1,1.6*Math.min(1,t)),d=1-r(i.length-.6,i.length,e);x.forEach((t,r)=>{let i=e-t.born;if(i<=0||d<=0){C.setMatrixAt(r,P);return}let s=(1-Math.exp(-3*i))/a,c=o/a*t.near,f=l(t.x+u*(t.vx*s+t.sway*Math.sin(t.swayRate*i+t.phase)*n(i/.5))),p=t.y+u*((t.vy+c)*s-c*i);A.setFromAxisAngle(t.axis,t.phase+t.spin*i+5*s*a);let m=Math.min(1.15,1-Math.exp(-14*i)*Math.cos(16*i))*d,h=u*t.near*m;C.setMatrixAt(r,k.compose(M.set(f,p,t.z),A,N.set(t.w*h,t.h*h,1)))});let f=e/.4;w.visible=f>0&&f<1;let p=1-(1-n(f))**3;w.position.set(v.x,v.y,2),w.scale.set(.05+(y*1.35+.08)*p,.05+(y*.55+.12)*p,1),w.material.uniforms.uLife.value=n(f),E.forEach((t,n)=>{let r=(e-t.at)/t.life;if(r<=0||r>=1){D.setMatrixAt(n,P);return}let i=u*t.size*Math.sin(Math.PI*r);A.setFromAxisAngle(j,t.turn+r),D.setMatrixAt(n,k.compose(M.set(l(t.x),t.y,3),A,N.set(i,i,1)))}),C.instanceMatrix.needsUpdate=!0,D.instanceMatrix.needsUpdate=!0};F(0,1);for(let e of[C,D])e.instanceColor&&(e.instanceColor.needsUpdate=!0);return{objects:O,update:F,dispose:()=>{for(let e of O)e.geometry.dispose(),e.material.dispose()}}}export{i as CONFETTI,c as confettiScene};