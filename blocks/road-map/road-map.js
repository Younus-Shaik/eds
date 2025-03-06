export default function decorate(block) {
  // Create the container for our roadmap
  const container = document.createElement('div');
  container.className = 'roadmap-container';
  
  // Create SVG element
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 1200 800');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  
  // Create the path data (keeping the original path)
  const pathData = 'M100,150 C250,150 250,450 400,450 S550,150 700,150 S850,450 1000,450 S1150,450 1150,450';
  
  // Define layers for proper stacking - this is key to prevent visual issues
  const roadLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  roadLayer.setAttribute('id', 'road-layer');
  
  const markerLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  markerLayer.setAttribute('id', 'marker-layer');
  
  // Create road shadow
  const roadShadow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  roadShadow.setAttribute('d', pathData);
  roadShadow.setAttribute('stroke', '#BBBBBB');
  roadShadow.setAttribute('stroke-width', '55');
  roadShadow.setAttribute('fill', 'none');
  roadShadow.setAttribute('stroke-linecap', 'round');
  roadShadow.setAttribute('stroke-linejoin', 'round');
  roadShadow.setAttribute('transform', 'translate(5, 8)');
  
  // Create main road
  const road = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  road.setAttribute('id', 'roadPath');
  road.setAttribute('d', pathData);
  road.setAttribute('stroke', '#222222');
  road.setAttribute('stroke-width', '50');
  road.setAttribute('fill', 'none');
  road.setAttribute('stroke-linecap', 'round');
  road.setAttribute('stroke-linejoin', 'round');
  
  // Create lane markings
  const laneMarkings = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  laneMarkings.setAttribute('d', pathData);
  laneMarkings.setAttribute('stroke', '#FFFFFF');
  laneMarkings.setAttribute('stroke-width', '4');
  laneMarkings.setAttribute('stroke-dasharray', '20 15');
  laneMarkings.setAttribute('fill', 'none');
  
  // Add roads to road layer
  roadLayer.appendChild(roadShadow);
  roadLayer.appendChild(road);
  roadLayer.appendChild(laneMarkings);
  
  // Define color stops for the marker
  const colorStops = [
    { position: 0.0, color: 'red' },
    { position: 0.2, color: 'blue' },
    { position: 0.4, color: 'green' },
    { position: 0.6, color: 'purple' },
    { position: 0.8, color: 'orange' },
    { position: 1.0, color: '#FF5500' }
  ];

  // Create moving marker (the car/indicator)
  const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  marker.classList.add('marker');
  marker.setAttribute('r', '12');
  marker.setAttribute('fill', colorStops[0].color); // Start with first color
  marker.setAttribute('stroke', 'white');
  marker.setAttribute('stroke-width', '2');
  markerLayer.appendChild(marker);
  
  // Add all layers to SVG in the correct order
  svg.appendChild(roadLayer);
  svg.appendChild(markerLayer);
  
  // Add SVG to container
  container.appendChild(svg);
  
  // Replace block content with our container
  block.textContent = '';
  block.appendChild(container);
  
  // Add CSS
  const style = document.createElement('style');
  style.textContent = `
    .roadmap-container {
      width: 100%;
      height: 100vh;
      position: relative;
      background: white;
      overflow: hidden;
    }
    
    .marker {
      filter: drop-shadow(0 0 5px rgba(0,0,0,0.5));
      transition: fill 0.3s ease;
    }
  `;
  document.head.appendChild(style);
  
  // Load GSAP for scrolling
  loadGSAP().then(() => initAnimation());
  
  function loadGSAP() {
    return new Promise(resolve => {
      // Load GSAP core
      const gsapScript = document.createElement('script');
      gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      document.head.appendChild(gsapScript);
      
      gsapScript.onload = () => {
        // Load ScrollTrigger
        const scrollTriggerScript = document.createElement('script');
        scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
        document.head.appendChild(scrollTriggerScript);
        
        scrollTriggerScript.onload = resolve;
      };
    });
  }
  
  function initAnimation() {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Get the road path element for calculations
    const roadPath = document.getElementById('roadPath');
    const pathLength = roadPath.getTotalLength();
    
    // Create an array of points for smoother animation
    const points = [];
    const totalPoints = 1000; // Large number for smoother animation
    
    for (let i = 0; i <= totalPoints; i++) {
      const progress = i / totalPoints;
      const point = roadPath.getPointAtLength(progress * pathLength);
      points.push({ x: point.x, y: point.y });
    }
    
    // Position marker at start
    const startPoint = roadPath.getPointAtLength(0);
    marker.setAttribute('cx', startPoint.x);
    marker.setAttribute('cy', startPoint.y);
    
    // Create scroll trigger
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=3000",
      scrub: 0.5,
      pin: true,
      onUpdate: self => {
        const baseProgress = self.progress || 0;
        const adjustedProgress = Math.min(1, baseProgress * 1.01);
        const pointIndex = Math.floor(adjustedProgress * totalPoints);
        
        if (pointIndex >= 0 && pointIndex <= totalPoints && points[pointIndex]) {
          marker.setAttribute('cx', points[pointIndex].x);
          marker.setAttribute('cy', points[pointIndex].y);
          
          // Update marker color based on progress
          for (let i = colorStops.length - 1; i >= 0; i--) {
            if (baseProgress >= colorStops[i].position) {
              marker.setAttribute('fill', colorStops[i].color);
              break;
            }
          }
          
          // Grow marker when reaching the end
          if (baseProgress > 0.98) {
            gsap.to(marker, { attr: { r: 15 }, duration: 0.5 });
          } else {
            gsap.to(marker, { attr: { r: 12 }, duration: 0.3 });
          }
        }
      }
    });
    
    // Add debug panel if needed
    if (window.location.search.includes('debug')) {
      const debugPanel = document.createElement('div');
      debugPanel.style.position = 'fixed';
      debugPanel.style.bottom = '20px';
      debugPanel.style.right = '20px';
      debugPanel.style.backgroundColor = 'rgba(0,0,0,0.7)';
      debugPanel.style.color = 'white';
      debugPanel.style.padding = '10px';
      debugPanel.style.fontFamily = 'monospace';
      debugPanel.style.zIndex = '9999';
      document.body.appendChild(debugPanel);
      
      setInterval(() => {
        const st = ScrollTrigger.getAll()[0];
        const progress = st ? st.progress : 0;
        debugPanel.innerHTML = `Progress: ${(progress * 100).toFixed(1)}%<br>Pos: (${marker.getAttribute('cx')}, ${marker.getAttribute('cy')})`;
      }, 100);
    }
  }
}

