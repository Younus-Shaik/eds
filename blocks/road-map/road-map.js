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
  
  const checkpointLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  checkpointLayer.setAttribute('id', 'checkpoint-layer');
  
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
  
  // Define checkpoints
  const checkpoints = [
    { position: 0.2, color: 'blue', label: '1' },
    { position: 0.35, color: 'green', label: '2' },
    { position: 0.5, color: 'purple', label: '3' },
    { position: 0.7, color: 'orange', label: '4' },
    { position: 0.9, color: 'teal', label: '5' }
  ];
  
  // Create the indicators for active checkpoints (will be positioned later)
  const activeIndicators = [];
  
  // Add all checkpoints
  checkpoints.forEach(checkpoint => {
    // Regular checkpoint
    const checkpointMarker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    checkpointMarker.classList.add('checkpoint');
    checkpointMarker.setAttribute('data-position', checkpoint.position);
    checkpointMarker.setAttribute('r', '8');
    checkpointMarker.setAttribute('fill', checkpoint.color);
    
    // Active indicator (initially hidden)
    const activeIndicator = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    activeIndicator.setAttribute('r', '12');
    activeIndicator.setAttribute('fill', 'none');
    activeIndicator.setAttribute('stroke', checkpoint.color);
    activeIndicator.setAttribute('stroke-width', '2');
    activeIndicator.setAttribute('opacity', '0');
    activeIndicator.classList.add('active-indicator');
    activeIndicators.push(activeIndicator);
    
    // Add label
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.textContent = checkpoint.label;
    label.classList.add('checkpoint-label');
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('dominant-baseline', 'central');
    label.setAttribute('fill', 'white');
    label.setAttribute('font-size', '10px');
    label.setAttribute('font-weight', 'bold');
    
    // Add to checkpoint layer (will position them later)
    checkpointLayer.appendChild(activeIndicator);
    checkpointLayer.appendChild(checkpointMarker);
    checkpointLayer.appendChild(label);
  });
  
  // Add end marker
  const endMarker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  endMarker.classList.add('end-marker');
  endMarker.setAttribute('r', '10');
  endMarker.setAttribute('fill', '#FF5500');
  checkpointLayer.appendChild(endMarker);
  
  // Create moving marker (the car/indicator)
  const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  marker.classList.add('marker');
  marker.setAttribute('r', '12');
  marker.setAttribute('fill', 'red');
  marker.setAttribute('stroke', 'white');
  marker.setAttribute('stroke-width', '2');
  markerLayer.appendChild(marker);
  
  // Add all layers to SVG in the correct order
  svg.appendChild(roadLayer);
  svg.appendChild(checkpointLayer);
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
    
    .checkpoint {
      filter: drop-shadow(0 0 3px rgba(0,0,0,0.3));
    }
    
    .checkpoint-label {
      pointer-events: none;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    }
    
    .marker {
      filter: drop-shadow(0 0 5px rgba(0,0,0,0.5));
      transition: fill 0.3s ease;
    }
    
    .end-marker {
      opacity: 0.8;
    }
    
    .active-indicator {
      animation: pulse 1.5s infinite ease-out;
    }
    
    @keyframes pulse {
      0% { opacity: 0.8; stroke-width: 2; r: 10; }
      100% { opacity: 0; stroke-width: 1; r: 20; }
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
    
    // Calculate positions for all checkpoints
    document.querySelectorAll('.checkpoint').forEach((checkpoint, index) => {
      const position = parseFloat(checkpoint.getAttribute('data-position'));
      const point = roadPath.getPointAtLength(position * pathLength);
      
      checkpoint.setAttribute('cx', point.x);
      checkpoint.setAttribute('cy', point.y);
      
      // Position active indicators
      activeIndicators[index].setAttribute('cx', point.x);
      activeIndicators[index].setAttribute('cy', point.y);
      
      // Position labels
      const label = document.querySelectorAll('.checkpoint-label')[index];
      label.setAttribute('x', point.x);
      label.setAttribute('y', point.y);
    });
    
    // Position end marker
    const endPoint = roadPath.getPointAtLength(pathLength);
    endMarker.setAttribute('cx', endPoint.x);
    endMarker.setAttribute('cy', endPoint.y);
    
    // Position marker at start
    const startPoint = roadPath.getPointAtLength(0);
    marker.setAttribute('cx', startPoint.x);
    marker.setAttribute('cy', startPoint.y);
    
    // Create an array of points for smoother animation
    const points = [];
    const totalPoints = 1000; // Large number for smoother animation
    
    for (let i = 0; i <= totalPoints; i++) {
      const progress = i / totalPoints;
      const point = roadPath.getPointAtLength(progress * pathLength);
      points.push({ x: point.x, y: point.y });
    }
    
    // Get the exact end point
    points[totalPoints] = { 
      x: endPoint.x, 
      y: endPoint.y 
    };
    
    // Create scroll trigger
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=3000", // Longer scroll distance
      scrub: 0.5,    // Smoother scrubbing
      pin: true,
      onUpdate: self => {
        // Calculate progress with extra boost at the end to ensure we reach 100%
        const baseProgress = self.progress || 0;
        const adjustedProgress = Math.min(1, baseProgress * 1.01);
        
        // Get point index
        const pointIndex = Math.floor(adjustedProgress * totalPoints);
        
        // Safety check
        if (pointIndex >= 0 && pointIndex <= totalPoints && points[pointIndex]) {
          // Set marker position
          marker.setAttribute('cx', points[pointIndex].x);
          marker.setAttribute('cy', points[pointIndex].y);
          
          // Force marker to exact end position when very close to end
          if (adjustedProgress > 0.99) {
            marker.setAttribute('cx', endPoint.x);
            marker.setAttribute('cy', endPoint.y);
          }
          
          // Update checkpoints and marker color
          checkpoints.forEach((checkpoint, i) => {
            if (baseProgress >= checkpoint.position) {
              // Set indicator visible
              activeIndicators[i].setAttribute('opacity', '1');
              marker.setAttribute('fill', checkpoint.color);
            } else {
              // Hide indicator
              activeIndicators[i].setAttribute('opacity', '0');
            }
          });
          
          // Special handling for end point
          if (baseProgress > 0.95) {
            marker.setAttribute('fill', '#FF5500');
            gsap.to(endMarker, { r: 13, duration: 0.3, ease: "elastic.out(1, 0.3)" });
          } else {
            gsap.to(endMarker, { r: 10, duration: 0.3 });
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
        debugPanel.innerHTML = `Progress: ${(progress * 100).toFixed(1)}%<br>Pos: (${marker.getAttribute('cx')}, ${marker.getAttribute('cy')})<br>End: (${endPoint.x}, ${endPoint.y})`;
      }, 100);
    }
  }
}

