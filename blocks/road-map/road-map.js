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

   // Create the person silhouette
   const personPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
   personPath.setAttribute('d', 'M15.5 7.5C13.43 7.5 11.75 9.43 11.75 11.5C11.75 13.57 13.43 15.5 15.5 15.5C17.57 15.5 19.25 13.57 19.25 11.5C19.25 9.43 17.57 7.5 15.5 7.5ZM10.375 20.625C10.375 20.625 8.75 20.625 8.75 22.25C8.75 23.875 10.375 27.5 15.5 27.5C20.625 27.5 22.25 23.875 22.25 22.25C22.25 20.625 20.625 20.625 20.625 20.625H10.375Z');
   personPath.setAttribute('fill', '#333333');
   personPath.setAttribute('class', 'current-icon');
   
   // Create the book icon
   const learnPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
   learnPath.setAttribute('d', 'M14.5 2H9l-.35.15-.65.64-.65-.64L7 2H1.5l-.5.5v10l.5.5h5.29l.86.85h.7l.86-.85h5.29l.5-.5v-10l-.5-.5zm-7 10.32l-.18-.17L7 12H2V3h4.79l.74.74-.03 8.58zM14 12H9l-.35.15-.14.13V3.7l.7-.7H14v9zM6 5H3v1h3V5zm0 4H3v1h3V9zM3 7h3v1H3V7zm10-2h-3v1h3V5zm-3 2h3v1h-3V7zm0 2h3v1h-3V9z');
   learnPath.setAttribute('fill', '#333333');
   learnPath.setAttribute('transform', 'translate(10, 7) scale(0.8)');
   learnPath.setAttribute('class', 'current-icon');

  // Create the enablement icon
  const enablementPath = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  enablementPath.setAttribute('class', 'current-icon');
  
  const enablementMain = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  enablementMain.setAttribute('d', 'M12 4a1 1 0 0 0-1 1c0 1.692-2.046 2.54-3.243 1.343a1 1 0 1 0-1.414 1.414C7.54 8.954 6.693 11 5 11a1 1 0 1 0 0 2c1.692 0 2.54 2.046 1.343 3.243a1 1 0 0 0 1.414 1.414C8.954 16.46 11 17.307 11 19a1 1 0 1 0 2 0c0-1.692 2.046-2.54 3.243-1.343a1 1 0 1 0 1.414-1.414C16.46 15.046 17.307 13 19 13a1 1 0 1 0 0-2c-1.692 0-2.54-2.046-1.343-3.243a1 1 0 0 0-1.414-1.414C15.046 7.54 13 6.693 13 5a1 1 0 0 0-1-1zm-2.992.777a3 3 0 0 1 5.984 0 3 3 0 0 1 4.23 4.231 3 3 0 0 1 .001 5.984 3 3 0 0 1-4.231 4.23 3 3 0 0 1-5.984 0 3 3 0 0 1-4.231-4.23 3 3 0 0 1 0-5.984 3 3 0 0 1 4.231-4.231z');
  enablementMain.setAttribute('fill', '#333333');

  const enablementCenter = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  enablementCenter.setAttribute('d', 'M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-2.828-.828a4 4 0 1 1 5.656 5.656 4 4 0 0 1-5.656-5.656z');
  enablementCenter.setAttribute('fill', '#333333');

  enablementPath.appendChild(enablementMain);
  enablementPath.appendChild(enablementCenter);
  enablementPath.setAttribute('transform', 'translate(8, 3) scale(0.7)');

  // Create the deployment icon
  const deploymentPath = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  deploymentPath.setAttribute('class', 'current-icon');

  // Create the outer rectangle
  const deploymentRect = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  deploymentRect.setAttribute('d', 'M27 5H5c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h22c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2');
  deploymentRect.setAttribute('fill', 'none');
  deploymentRect.setAttribute('stroke', '#333333');
  deploymentRect.setAttribute('stroke-width', '2');
  deploymentRect.setAttribute('stroke-linecap', 'round');
  deploymentRect.setAttribute('stroke-linejoin', 'round');

  // Create the horizontal line
  const horizontalLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  horizontalLine.setAttribute('d', 'M3 11h26');
  horizontalLine.setAttribute('stroke', '#333333');
  horizontalLine.setAttribute('stroke-width', '2');
  horizontalLine.setAttribute('stroke-linecap', 'round');
  horizontalLine.setAttribute('stroke-linejoin', 'round');

  // Create the dots
  const dots = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  dots.setAttribute('d', 'M7 9c-.3 0-.5-.1-.7-.3S6 8.3 6 8s.1-.5.3-.7l.1-.1c.1 0 .1-.1.2-.1.1-.1.1-.1.2-.1h.4c.1 0 .1 0 .2.1.1 0 .1.1.2.1l.1.1c.1.1.2.2.2.3.1.1.1.3.1.4s0 .3-.1.4c0 .1-.1.2-.2.3-.2.2-.4.3-.7.3m3 0c-.3 0-.5-.1-.7-.3S9 8.3 9 8c0-.1 0-.3.1-.4s.1-.2.2-.3.2-.2.3-.2c.4-.2.8-.1 1.1.2.1.1.2.2.2.3.1.1.1.3.1.4 0 .3-.1.5-.3.7s-.4.3-.7.3m3 0c-.1 0-.3 0-.4-.1s-.2-.1-.3-.2-.2-.2-.2-.3c-.1-.1-.1-.3-.1-.4s0-.3.1-.4.1-.2.2-.3c.4-.4 1-.4 1.4 0 .1.1.2.2.2.3.1.1.1.3.1.4s0 .3-.1.4-.1.2-.2.3c-.2.2-.4.3-.7.3');
  dots.setAttribute('fill', '#333333');

  // Create the arrows and diagonal line
  const arrows = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  arrows.setAttribute('d', 'M11 16l-3 3 3 3m10-6l3 3-3 3m-3-7l-4 8');
  arrows.setAttribute('fill', 'none');
  arrows.setAttribute('stroke', '#333333');
  arrows.setAttribute('stroke-width', '2');
  arrows.setAttribute('stroke-linecap', 'round');
  arrows.setAttribute('stroke-linejoin', 'round');

  deploymentPath.appendChild(deploymentRect);
  deploymentPath.appendChild(horizontalLine);
  deploymentPath.appendChild(dots);
  deploymentPath.appendChild(arrows);
  deploymentPath.setAttribute('transform', 'translate(3, 3) scale(0.6)');

  // Define color stops for the marker
  const colorStops = [
    { position: 0.0, path: personPath },
    { position: 0.2, path: learnPath },
    { position: 0.4, path: enablementPath },
    { position: 0.6, path: deploymentPath },
    { position: 0.8, path: personPath },
    { position: 1.0, path: learnPath }
  ];

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
  
  // Create moving marker (the car/indicator)
  const marker = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  marker.classList.add('marker');
  
  // Create the pin shape
  const pinPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pinPath.setAttribute('d', 'M30.66 19C28.415 26.625 15.788 38.125 15.788 38.125C15.788 38.125 0.529 26.5 0.038 18.25C-0.587 7.75 6.538 0.625 15.788 0C25.038 0.75 32.413 9 30.66 19Z');
  pinPath.setAttribute('fill', '#FF5500');
  
  // Create the white circle background
  const innerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
  innerCircle.setAttribute('cx', '15.66');
  innerCircle.setAttribute('cy', '15.625');
  innerCircle.setAttribute('rx', '11.25');
  innerCircle.setAttribute('ry', '11.125');
  innerCircle.setAttribute('fill', 'white');
  
 
  
  // Add all elements to the marker group
  marker.appendChild(pinPath);
  marker.appendChild(innerCircle);
  marker.appendChild(personPath);
  
  // Scale and center the marker
  marker.setAttribute('transform', 'translate(-15.5, -65) scale(2)');
  
  markerLayer.appendChild(marker);
  
  // Add all layers to SVG in the correct order
  svg.appendChild(roadLayer);
  svg.appendChild(markerLayer);
  
  // Add SVG to container
  container.appendChild(svg);
  
  // Replace block content with our container
  block.textContent = '';
  block.appendChild(container);
  
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
    marker.setAttribute('transform', `translate(${startPoint.x - 15.5}, ${startPoint.y - 65}) scale(2)`);
    
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
          const point = points[pointIndex];
          // Update marker position using transform
          const scale = baseProgress > 0.98 ? 2.4 : 2;
          marker.setAttribute('transform', `translate(${point.x - 15.5}, ${point.y - 65}) scale(${scale})`);
          
          // Update marker icon based on progress
          for (let i = colorStops.length - 1; i >= 0; i--) {
            if (baseProgress >= colorStops[i].position) {
              // Remove existing path
              const currentIcon = marker.querySelector('.current-icon');
              if (currentIcon) {
                marker.removeChild(currentIcon);
              }
              
              // Clone and add new path
              const newPath = colorStops[i].path.cloneNode(true);
              newPath.classList.add('current-icon');
              marker.appendChild(newPath);
              break;
            }
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
        const markerBBox = marker.getBBox();
        debugPanel.innerHTML = `Progress: ${(progress * 100).toFixed(1)}%<br>Pos: (${markerBBox.x + markerBBox.width/2}, ${markerBBox.y + markerBBox.height/2})`;
      }, 100);
    }
  }
}

