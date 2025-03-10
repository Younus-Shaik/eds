export default function decorate(block) {
  // Create the container for our roadmap
  const container = document.createElement('div');
  container.className = 'roadmap-container';
  container.style.position = 'relative';
  container.style.width = '100%';
  container.style.maxHeight = '800px';
  container.style.margin = '0 auto';
  container.style.overflow = 'hidden';
  
  // Create SVG element
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 1200 600');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  
  // Create the path data (keeping the original path)
  const pathData = 'M100,400 C200,200 350,500 450,200 C550,0 650,500 750,200 C850,0 950,250 1150,400';

   // Create the person silhouette
   const personPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
   personPath.setAttribute('d', 'M15.5 7.5C13.43 7.5 11.75 9.43 11.75 11.5C11.75 13.57 13.43 15.5 15.5 15.5C17.57 15.5 19.25 13.57 19.25 11.5C19.25 9.43 17.57 7.5 15.5 7.5ZM10.375 20.625C10.375 20.625 8.75 20.625 8.75 22.25C8.75 23.875 10.375 27.5 15.5 27.5C20.625 27.5 22.25 23.875 22.25 22.25C22.25 20.625 20.625 20.625 20.625 20.625H10.375Z');
   personPath.setAttribute('fill', '#333333');
   personPath.setAttribute('class', 'current-icon');
   personPath.classList.add('person-icon');
   
   // Create the book icon
   const learnPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
   learnPath.setAttribute('d', 'M14.5 2H9l-.35.15-.65.64-.65-.64L7 2H1.5l-.5.5v10l.5.5h5.29l.86.85h.7l.86-.85h5.29l.5-.5v-10l-.5-.5zm-7 10.32l-.18-.17L7 12H2V3h4.79l.74.74-.03 8.58zM14 12H9l-.35.15-.14.13V3.7l.7-.7H14v9zM6 5H3v1h3V5zm0 4H3v1h3V9zM3 7h3v1H3V7zm10-2h-3v1h3V5zm-3 2h3v1h-3V7zm0 2h3v1h-3V9z');
   learnPath.setAttribute('fill', '#333333');
   learnPath.setAttribute('transform', 'translate(10, 7) scale(0.8)');
   learnPath.setAttribute('class', 'learn-icon');

  // Create the enablement icon
  const enablementPath = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  enablementPath.setAttribute('class', 'enablement-icon');
  
  const enablementMain = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  enablementMain.setAttribute('d', 'M12 4a1 1 0 0 0-1 1c0 1.692-2.046 2.54-3.243 1.343a1 1 0 1 0-1.414 1.414C7.54 8.954 6.693 11 5 11a1 1 0 1 0 0 2c1.692 0 2.54 2.046 1.343 3.243a1 1 0 0 0 1.414 1.414C8.954 16.46 11 17.307 11 19a1 1 0 1 0 2 0c0-1.692 2.046-2.54 3.243-1.343a1 1 0 0 0 1.414-1.414C16.46 15.046 17.307 13 19 13a1 1 0 1 0 0-2c-1.692 0-2.54-2.046-1.343-3.243a1 1 0 0 0-1.414-1.414C15.046 7.54 13 6.693 13 5a1 1 0 0 0-1-1zm-2.992.777a3 3 0 0 1 5.984 0 3 3 0 0 1 4.23 4.231 3 3 0 0 1 .001 5.984 3 3 0 0 1-4.231 4.23 3 3 0 0 1-5.984 0 3 3 0 0 1-4.231-4.23 3 3 0 0 1 0-5.984 3 3 0 0 1 4.231-4.231z');
  enablementMain.setAttribute('fill', '#333333');

  const enablementCenter = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  enablementCenter.setAttribute('d', 'M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-2.828-.828a4 4 0 1 1 5.656 5.656 4 4 0 0 1-5.656-5.656z');
  enablementCenter.setAttribute('fill', '#333333');

  enablementPath.appendChild(enablementMain);
  enablementPath.appendChild(enablementCenter);
  enablementPath.setAttribute('transform', 'translate(8, 3) scale(0.7)');

  // Create the deployment icon
  const deploymentPath = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  deploymentPath.setAttribute('class', 'deployment-icon');

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

  // Create the scroller hat icon
  const scrollerHatPath = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  scrollerHatPath.setAttribute('class', 'scroller-hat-icon');

  // Create the main hat shape
  const hatMain = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  hatMain.setAttribute('d', 'M65.635,24.988l-30-10.037c-0.412-0.139-0.857-0.139-1.27,0l-30,10.037C3.539,25.265,2.987,26.044,3,26.915s0.589,1.634,1.423,1.885l8.16,2.458v6.627c0,0.498,0.403,0.979,0.739,1.348c0.185,0.203,1.385,1.24,2.549,1.715c0.248,0.102,0.503,0.149,0.755,0.149c0.789,0,1.428-0.471,1.744-1.246c0.417-1.022-0.183-2.189-1.205-2.606c-0.093-0.038,0.418-0.126-0.582-0.234v-4.535l3,0.92v16.129C18.645,50.032,18,51.013,18,52.153c0,1.656,1.343,3,3,3s3-1.344,3-3c0-0.55-0.159-1.059-0.417-1.501V34.622l3.858,1.183l7,2.037c0.183,0.054,0.371,0.08,0.559,0.08c0.194,0,0.389-0.028,0.577-0.085l16.006-4.822v4.465c-1,1.22-6.533,4.442-17.287,4.442c-2.417,0-4.24-0.116-6.02-0.356c-1.096-0.138-2.102,0.621-2.249,1.716c-0.147,1.095,0.621,2.102,1.715,2.249c1.958,0.264,4.173,0.392,6.77,0.392c15.159,0,20.533-5.938,20.763-6.19c0.336-0.368,0.307-0.849,0.307-1.348v-6.349c0-0.075-0.014-0.146-0.022-0.219L65.577,28.8c0.834-0.251,1.409-1.014,1.423-1.885C67.013,26.044,66.461,25.265,65.635,24.988z');
  hatMain.setAttribute('fill', '#333333');

  // Create the middle section
  const hatMiddle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  hatMiddle.setAttribute('d', 'M34.99,33.836l-6.404-1.863l-2.53-0.776l9.887-3.468c1.041-0.37,1.774-1.515,1.403-2.555c-0.371-1.041-1.571-1.584-2.61-1.213L21.129,28.77c-0.352,0.125-0.689,0.345-0.962,0.621l-4.699-1.441l-3.865-1.164L35,18.957l23.397,7.828L34.99,33.836z');
  hatMiddle.setAttribute('fill', '#333333');

  // Create the small circles
  const hatCircle1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  hatCircle1.setAttribute('d', 'M40.61,30.482c0.096,0,0.193-0.014,0.289-0.043L45.677,29c0.529-0.159,0.829-0.717,0.669-1.245c-0.159-0.528-0.717-0.834-1.245-0.669l-4.778,1.439c-0.528,0.159-0.828,0.717-0.669,1.245C39.784,30.203,40.181,30.482,40.61,30.482z');
  hatCircle1.setAttribute('fill', '#333333');

  const hatCircle2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  hatCircle2.setAttribute('d', 'M48.887,28.074c0.095,0,0.192-0.014,0.288-0.043l2.227-0.671c0.529-0.159,0.829-0.717,0.669-1.245c-0.159-0.528-0.716-0.832-1.245-0.669l-2.227,0.671c-0.529,0.159-0.829,0.717-0.669,1.245C48.06,27.795,48.457,28.074,48.887,28.074z');
  hatCircle2.setAttribute('fill', '#333333');

  scrollerHatPath.appendChild(hatMain);
  scrollerHatPath.appendChild(hatMiddle);
  scrollerHatPath.appendChild(hatCircle1);
  scrollerHatPath.appendChild(hatCircle2);
  scrollerHatPath.setAttribute('transform', 'translate(5, 5) scale(0.4)');

  // Define color stops for the marker
  const colorStops = [
    { position: 0.0, path: personPath, title: "Interview Process", content: ["Complete screening application", "Attend technical interview", "Meet with hiring manager"], color: '#FF5500' },
    { position: 0.25, path: learnPath, title: "Training On Tech", content: ["Learn fundamentals of web development", "Practice with Adobe tools", "Complete assigned tutorials"], color: '#4CAF50' },
    { position: 0.5, path: enablementPath, title: "Enablement", content: ["Access to Adobe Creative Cloud", "System configuration", "Permission setup for development"], color: '#2196F3' },
    { position: 0.75, path: deploymentPath, title: "Live Project", content: ["Collaborate with team members", "Implement customer features", "Present progress in sprint reviews"], color: '#9C27B0' },
    { position: 1.0, path: scrollerHatPath, title: "Completion Of Apprenticeship", content: ["Final project presentation", "Manager evaluation", "Certificate of completion"], color: '#FF9800' }
  ];

  // Define layers for proper stacking - this is key to prevent visual issues
  const roadLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  roadLayer.setAttribute('id', 'road-layer');
  
  const stopsLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  stopsLayer.setAttribute('id', 'stops-layer');
  
  const markerLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  markerLayer.setAttribute('id', 'marker-layer');
  markerLayer.style.zIndex = '-1'; // Ensure moving person stays behind markers
  
  // Create checkpoint markers (fixed pin and ellipse at each point)
  const checkpointMarkersLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  checkpointMarkersLayer.setAttribute('id', 'checkpoint-markers-layer');
  checkpointMarkersLayer.style.zIndex = '1'; // Ensure markers stay in front
  
  // Create road shadow
  const roadShadow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  roadShadow.setAttribute('d', pathData);
  roadShadow.setAttribute('stroke', '#CCCCCC');
  roadShadow.setAttribute('stroke-width', '45');
  roadShadow.setAttribute('fill', 'none');
  roadShadow.setAttribute('stroke-linecap', 'round');
  roadShadow.setAttribute('stroke-linejoin', 'round');
  roadShadow.setAttribute('transform', 'translate(4, 6)');
  
  // Create main road
  const road = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  road.setAttribute('id', 'roadPath');
  road.setAttribute('d', pathData);
  road.setAttribute('stroke', '#333333');
  road.setAttribute('stroke-width', '40');
  road.setAttribute('fill', 'none');
  road.setAttribute('stroke-linecap', 'round');
  road.setAttribute('stroke-linejoin', 'round');
  
  // Create lane markings
  const laneMarkings = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  laneMarkings.setAttribute('d', pathData);
  laneMarkings.setAttribute('stroke', '#FFFFFF');
  laneMarkings.setAttribute('stroke-width', '3');
  laneMarkings.setAttribute('stroke-dasharray', '10 10');
  laneMarkings.setAttribute('fill', 'none');
  
  // Add roads to road layer
  roadLayer.appendChild(roadShadow);
  roadLayer.appendChild(road);
  roadLayer.appendChild(laneMarkings);
  
  // Create stop points
  function createStopPoint(position) {
    const roadPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    roadPath.setAttribute('d', pathData);
    const pathLength = roadPath.getTotalLength();
    const point = roadPath.getPointAtLength(position * pathLength);
    
    // Create stop marker
    const stopPoint = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    // Outer circle (white border)
    const outerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    outerCircle.setAttribute('cx', point.x);
    outerCircle.setAttribute('cy', point.y);
    outerCircle.setAttribute('r', '12');
    outerCircle.setAttribute('fill', 'white');
    outerCircle.setAttribute('stroke', '#E1E1E1');
    outerCircle.setAttribute('stroke-width', '1');
    
    // Inner circle
    const innerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    innerCircle.setAttribute('cx', point.x);
    innerCircle.setAttribute('cy', point.y);
    innerCircle.setAttribute('r', '6');
    innerCircle.setAttribute('fill', '#1473E6'); // Adobe blue
    
    stopPoint.appendChild(outerCircle);
    stopPoint.appendChild(innerCircle);
    
    return stopPoint;
  }
  
  // Create stop points for each color stop position
  for (let i = 0; i < colorStops.length; i++) {
    const stopPoint = createStopPoint(colorStops[i].position);
    stopsLayer.appendChild(stopPoint);
  }
  
  // Create checkpoint markers at each color stop
  const checkpointMarkers = [];
  for (let i = 0; i < colorStops.length; i++) {
    const roadPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    roadPath.setAttribute('d', pathData);
    const pathLength = roadPath.getTotalLength();
    const point = roadPath.getPointAtLength(colorStops[i].position * pathLength);
    
    // Create checkpoint marker (pin and ellipse)
    const checkpointMarker = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    checkpointMarker.classList.add('checkpoint-marker');
    checkpointMarker.setAttribute('data-position', colorStops[i].position);
    checkpointMarker.style.zIndex = '2'; // Ensure each marker stays in front
    
    // Create the pin shape
    const pinPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pinPath.setAttribute('d', 'M30.66 19C28.415 26.625 15.788 38.125 15.788 38.125C15.788 38.125 0.529 26.5 0.038 18.25C-0.587 7.75 6.538 0.625 15.788 0C25.038 0.75 32.413 9 30.66 19Z');
    pinPath.setAttribute('fill', colorStops[i].color);
    
    // Create the white circle background
    const innerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    innerCircle.setAttribute('cx', '15.66');
    innerCircle.setAttribute('cy', '15.625');
    innerCircle.setAttribute('rx', '11.25');
    innerCircle.setAttribute('ry', '11.125');
    innerCircle.setAttribute('fill', 'white');
    
    // Add elements to the checkpoint marker
    checkpointMarker.appendChild(pinPath);
    checkpointMarker.appendChild(innerCircle);
    
    // Add the checkpoint-specific icon
    if (i > 0) { // Skip the person icon for the first checkpoint (it will be the moving element)
      const iconPath = colorStops[i].path.cloneNode(true);
      iconPath.classList.add('checkpoint-icon');
      checkpointMarker.appendChild(iconPath);
    } else {
      // For the first checkpoint, add a clone of the person icon
      const personIconClone = personPath.cloneNode(true);
      personIconClone.classList.add('checkpoint-icon');
      personIconClone.classList.add('person-icon');
      checkpointMarker.appendChild(personIconClone);
    }
    
    // Create a foreign object for the dialogue box
    const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    
    // Calculate size based on content - decrease the size further
    const boxWidth = 90;  // Reduced from 110
    const boxHeight = 65;  // Reduced from 80
    
    // Position the dialogue box with more spacing between them
    if (i % 2 === 0) {
      // Above the checkpoint
      if (i === 0) {
        // First checkpoint (Interview Process) - position to the right and higher
        foreignObject.setAttribute('x', '0');
        foreignObject.setAttribute('y', '-120');
      } else if (i === colorStops.length - 1) {
        // Last checkpoint (Completion) - position to the bottom
        foreignObject.setAttribute('x', '-75');
        foreignObject.setAttribute('y', '90');
      } else if (colorStops[i].position === 0.5) {
        // Enablement checkpoint - position to the bottom
        foreignObject.setAttribute('x', '-40');
        foreignObject.setAttribute('y', '80');
      } else {
        // Standard above positioning for other checkpoints - move much higher up
        foreignObject.setAttribute('x', '-65');
        foreignObject.setAttribute('y', '-150');
      }
    } else {
      // Below the checkpoint - position lower but not too far
      foreignObject.setAttribute('x', '-75');
      foreignObject.setAttribute('y', '90');
    }
    
    foreignObject.setAttribute('width', boxWidth);
    foreignObject.setAttribute('height', boxHeight);
    foreignObject.setAttribute('class', 'dialogue-box');
    foreignObject.setAttribute('data-position', colorStops[i].position);
    
    // Create HTML content for the foreign object - Adobe style improvements
    const htmlDiv = document.createElement('div');
    htmlDiv.style.width = '100%';
    htmlDiv.style.height = '100%';
    htmlDiv.style.backgroundColor = 'white';
    htmlDiv.style.border = 'none';
    htmlDiv.style.borderRadius = '10px';  // Slightly reduced from 12px
    htmlDiv.style.padding = '7px';  // Reduced from 10px
    htmlDiv.style.boxSizing = 'border-box';
    htmlDiv.style.position = 'relative';
    htmlDiv.style.boxShadow = '0 3px 8px rgba(0, 0, 0, 0.09)';  // Lighter shadow
    htmlDiv.style.fontFamily = '"Adobe Clean", "Helvetica Neue", Helvetica, Arial, sans-serif';
    htmlDiv.style.fontSize = '10px';  // Reduced from 11px
    htmlDiv.style.color = '#4B4B4B';
    htmlDiv.style.overflow = 'hidden';
    htmlDiv.style.transition = 'transform 0.3s, box-shadow 0.3s';
    
    // Add a gradient background instead of solid color - making it more subtle
    htmlDiv.style.background = `linear-gradient(135deg, white 0%, #FCFCFC 100%)`;
    
    // Add the speech bubble pointer/tail
    const pointer = document.createElement('div');
    pointer.style.position = 'absolute';
    
    // Position the pointer based on whether the dialogue is above or below
    if (i % 2 === 0) {
      // For dialogue boxes above the line
      pointer.style.bottom = '-6px';  // Reduced from -8px
      pointer.style.left = '50%';
      pointer.style.marginLeft = '-6px';  // Reduced from -8px
      pointer.style.width = '12px';  // Reduced from 16px
      pointer.style.height = '6px';  // Reduced from 8px
      pointer.style.overflow = 'hidden';
      
      const pointerInner = document.createElement('div');
      pointerInner.style.position = 'absolute';
      pointerInner.style.top = '-6px';  // Reduced from -8px
      pointerInner.style.left = '0';
      pointerInner.style.width = '12px';  // Reduced from 16px
      pointerInner.style.height = '12px';  // Reduced from 16px
      pointerInner.style.transform = 'rotate(45deg)';
      pointerInner.style.backgroundColor = 'white';
      pointerInner.style.boxShadow = '0 3px 8px rgba(0, 0, 0, 0.09)';  // Match the lighter shadow
      pointer.appendChild(pointerInner);
    } else {
      // For dialogue boxes below the line
      pointer.style.top = '-6px';  // Reduced from -8px
      pointer.style.left = '50%';
      pointer.style.marginLeft = '-6px';  // Reduced from -8px
      pointer.style.width = '12px';  // Reduced from 16px
      pointer.style.height = '6px';  // Reduced from 8px
      pointer.style.overflow = 'hidden';
      
      const pointerInner = document.createElement('div');
      pointerInner.style.position = 'absolute';
      pointerInner.style.bottom = '-6px';  // Reduced from -8px
      pointerInner.style.left = '0';
      pointerInner.style.width = '12px';  // Reduced from 16px
      pointerInner.style.height = '12px';  // Reduced from 16px
      pointerInner.style.transform = 'rotate(45deg)';
      pointerInner.style.backgroundColor = 'white';
      pointerInner.style.boxShadow = '0 3px 8px rgba(0, 0, 0, 0.09)';  // Match the lighter shadow
      pointer.appendChild(pointerInner);
    }
    
    htmlDiv.appendChild(pointer);
    
    // Create icon + heading container for better layout
    const headerContainer = document.createElement('div');
    headerContainer.style.display = 'flex';
    headerContainer.style.alignItems = 'center';
    headerContainer.style.marginBottom = '5px';  // Reduced from 8px
    
    // Create a circular icon badge with the checkpoint color
    const iconBadge = document.createElement('div');
    iconBadge.style.width = '16px';  // Reduced from 22px
    iconBadge.style.height = '16px';  // Reduced from 22px
    iconBadge.style.borderRadius = '50%';
    iconBadge.style.backgroundColor = colorStops[i].color;
    iconBadge.style.display = 'flex';
    iconBadge.style.alignItems = 'center';
    iconBadge.style.justifyContent = 'center';
    iconBadge.style.marginRight = '5px';  // Reduced from 8px
    iconBadge.style.flexShrink = '0';
    
    // Add step number in the badge
    const stepNumber = document.createElement('span');
    stepNumber.textContent = (i + 1).toString();
    stepNumber.style.color = 'white';
    stepNumber.style.fontSize = '6px';  // Reduced from 9px
    stepNumber.style.fontWeight = 'bold';
    iconBadge.appendChild(stepNumber);
    
    // Create heading with clean styling
    const heading = document.createElement('h3');
    heading.textContent = colorStops[i].title;
    heading.style.margin = '0';
    heading.style.fontSize = '7px';  // Reduced from 11px
    heading.style.fontWeight = '600';
    heading.style.color = '#262626';
    heading.style.flexGrow = '1';
    heading.setAttribute('aria-label', `Checkpoint: ${colorStops[i].title}`);
    
    headerContainer.appendChild(iconBadge);
    headerContainer.appendChild(heading);
    
    // Add progress bar for visual interest
    const progressBar = document.createElement('div');
    progressBar.style.width = '100%';
    progressBar.style.height = '1px';  // Reduced from 2px
    progressBar.style.backgroundColor = '#F5F5F5';  // Lighter background
    progressBar.style.borderRadius = '1px';
    progressBar.style.marginBottom = '5px';  // Reduced from 8px
    
    const progressFill = document.createElement('div');
    progressFill.style.width = `${(i+1)/(colorStops.length)*100}%`;
    progressFill.style.height = '100%';
    progressFill.style.backgroundColor = colorStops[i].color;
    progressFill.style.opacity = '0.7';  // Added opacity to make it more subtle
    progressFill.style.borderRadius = '1px';
    
    progressBar.appendChild(progressFill);
    
    // Create a custom list with icons
    const contentContainer = document.createElement('div');
    contentContainer.style.display = 'flex';
    contentContainer.style.flexDirection = 'column';
    
    // Only show first two items to save space
    const displayItems = colorStops[i].content.slice(0, 2);
    displayItems.forEach(item => {
      const itemRow = document.createElement('div');
      itemRow.style.display = 'flex';
      itemRow.style.alignItems = 'flex-start';
      itemRow.style.marginBottom = '3px';  // Reduced from 6px
      
      // Create a custom checkmark icon
      const checkIcon = document.createElement('span');
      checkIcon.innerHTML = '&#10003;'; // Checkmark symbol
      checkIcon.style.color = colorStops[i].color;
      checkIcon.style.marginRight = '3px';
      checkIcon.style.fontSize = '5px';  // Reduced from 8px
      
      // For the text content
      const textSpan = document.createElement('span');
      // Truncate text if too long
      let displayText = item;
      if (displayText.length > 24) {
        displayText = displayText.substring(0, 22) + '...';
      }
      textSpan.textContent = displayText;
      textSpan.style.fontSize = '5px';  // Reduced from 9px
      textSpan.style.lineHeight = '1.2';  // Reduced from 1.3
      textSpan.style.color = '#505050';
      textSpan.setAttribute('title', item); // For tooltip on hover
      
      itemRow.appendChild(checkIcon);
      itemRow.appendChild(textSpan);
      contentContainer.appendChild(itemRow);
    });
    
    // Add a more items indicator if needed
    if (colorStops[i].content.length > 2) {
      const moreRow = document.createElement('div');
      moreRow.style.display = 'flex';
      moreRow.style.justifyContent = 'center';
      moreRow.style.marginTop = '2px';
      
      const dotsContainer = document.createElement('div');
      dotsContainer.style.display = 'flex';
      dotsContainer.style.gap = '3px';
      
      // Add three dots for a more visually interesting "more" indicator
      for (let j = 0; j < 3; j++) {
        const dot = document.createElement('div');
        dot.style.width = '4px';
        dot.style.height = '4px';
        dot.style.borderRadius = '50%';
        dot.style.backgroundColor = colorStops[i].color;
        dot.style.opacity = '0.6';
        dotsContainer.appendChild(dot);
      }
      
      moreRow.appendChild(dotsContainer);
      contentContainer.appendChild(moreRow);
    }
    
    // For active checkpoint, add special styling
    if (colorStops[i].active) {
      // Add a pulsing animation to the active checkpoint - but more subtle
      htmlDiv.style.animation = 'pulse 3s infinite';  // Slower animation (3s vs 2s)
      const keyframes = `
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(${hexToRgb(colorStops[i].color)}, 0.3); }
          70% { box-shadow: 0 0 0 4px rgba(${hexToRgb(colorStops[i].color)}, 0); }
          100% { box-shadow: 0 0 0 0 rgba(${hexToRgb(colorStops[i].color)}, 0); }
        }
      `;
      
      // Add the keyframes to the document
      const style = document.createElement('style');
      style.textContent = keyframes;
      document.head.appendChild(style);
      
      // Add "You are here" ribbon - smaller
      const ribbon = document.createElement('div');
      ribbon.textContent = 'HERE';
      ribbon.style.position = 'absolute';
      ribbon.style.top = '5px';
      ribbon.style.right = '-18px';
      ribbon.style.backgroundColor = colorStops[i].color;
      ribbon.style.color = 'white';
      ribbon.style.fontSize = '5px';  // Reduced from 6px
      ribbon.style.padding = '2px 18px';
      ribbon.style.transform = 'rotate(45deg)';
      ribbon.style.transformOrigin = 'center right';
      ribbon.style.fontWeight = 'bold';
      ribbon.style.letterSpacing = '0.05em';
      ribbon.style.boxShadow = '0 1px 2px rgba(0,0,0,0.1)';
      ribbon.style.opacity = '0.85';
      htmlDiv.appendChild(ribbon);
    }
    
    // Function to convert hex to rgb for animation
    function hexToRgb(hex) {
      // Remove # if present
      hex = hex.replace('#', '');
      
      // Parse the hex values
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      
      return `${r}, ${g}, ${b}`;
    }
    
    // Add all elements to the main container
    htmlDiv.appendChild(headerContainer);
    htmlDiv.appendChild(progressBar);
    htmlDiv.appendChild(contentContainer);
    
    // Add the dialogue box to the marker
    foreignObject.appendChild(htmlDiv);
    checkpointMarker.appendChild(foreignObject);
    
    // Initially hide all markers and dialogue boxes except the first one
    if (i > 0) {
      checkpointMarker.style.opacity = '0';
      checkpointMarker.style.transition = 'opacity 0.5s ease';
      foreignObject.style.display = 'none';
    } else {
      // For the first checkpoint (Interview Process), show the marker but hide the dialogue box
      checkpointMarker.style.opacity = '1';
      foreignObject.style.display = 'none';
    }
    
    // Position and scale the checkpoint marker
    checkpointMarker.setAttribute('transform', `translate(${point.x - 31}, ${point.y - 75}) scale(2)`);
    
    // Add to DOM
    checkpointMarkersLayer.appendChild(checkpointMarker);
    checkpointMarkers.push(checkpointMarker);
  }
  
  // Create moving person (only the person silhouette will move)
  const movingPerson = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  movingPerson.classList.add('moving-person');
  movingPerson.setAttribute('fill', '#434343');
  movingPerson.style.zIndex = '-1'; // Ensure moving person stays behind markers
  
  // Create the new person path
  const movingPersonPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  movingPersonPath.setAttribute('d', 'M9.855 10.053c-.423.571-1.834.719-1.834.719s-1.441-.142-1.865-.706c-2.035 0-3.098 2.923-3.098 2.923h9.926c0-.001-.838-2.936-3.129-2.936m.088-4.135C9.943 6.977 9.062 9 7.978 9 6.89 9 6.011 6.977 6.011 5.918S6.89 4 7.978 4c1.084 0 1.965.859 1.965 1.918m4.161 2.103c-.371.575-1.527.881-1.527.881s-1.355-.301-1.729-.867c0 0-.012.664-.577 1.436 1.8-.232 2.578 1.503 2.578 1.503l3.131.006c-.001-.001.139-2.959-1.876-2.959m-.114-3.488c0 .848-.662 2.465-1.479 2.465-.82 0-1.481-1.617-1.481-2.465 0-.846.663-1.533 1.481-1.533.817 0 1.479.688 1.479 1.533M1.918 8.021c.378.571 1.549.875 1.549.875s1.373-.299 1.748-.861c0 0 .014.66.586 1.426-1.824-.23-2.61 1.492-2.61 1.492l-3.17.005s-.143-2.937 1.897-2.937m.084-3.455c0 .828.664 2.411 1.479 2.411.819 0 1.48-1.583 1.48-2.411a1.49 1.49 0 0 0-1.48-1.501 1.49 1.49 0 0 0-1.479 1.501');
  movingPersonPath.setAttribute('fill', '#434343');
  movingPersonPath.setAttribute('fill-rule', 'evenodd');
  movingPersonPath.classList.add('current-icon');
  movingPersonPath.classList.add('person-icon');
  
  // Add person to the moving group
  movingPerson.appendChild(movingPersonPath);
  
  // Scale and initially position the moving person
  movingPerson.setAttribute('transform', 'translate(-15.5, -75) scale(2)');
  
  markerLayer.appendChild(movingPerson);
  
  // Add all layers to SVG in the correct order
  svg.appendChild(roadLayer);
  svg.appendChild(stopsLayer);
  svg.appendChild(markerLayer); // Moving person layer
  svg.appendChild(checkpointMarkersLayer); // Checkpoint markers layer (on top)
  
  // Add SVG to container
  container.appendChild(svg);
  
  // Replace block content with our container
  block.textContent = '';
  block.appendChild(container);
  
  // Add viewport toggle switch - move this after container is created
  const viewportToggle = document.createElement('div');
  viewportToggle.className = 'viewport-toggle';
  viewportToggle.style.position = 'absolute';
  viewportToggle.style.top = '20px';
  viewportToggle.style.right = '20px';
  viewportToggle.style.zIndex = '100';
  viewportToggle.style.background = 'rgba(255, 255, 255, 0.8)';
  viewportToggle.style.padding = '5px 10px';
  viewportToggle.style.borderRadius = '20px';
  viewportToggle.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
  viewportToggle.style.display = 'flex';
  viewportToggle.style.alignItems = 'center';
  viewportToggle.style.cursor = 'pointer';
  viewportToggle.style.fontFamily = '"Adobe Clean", sans-serif';
  viewportToggle.style.fontSize = '12px';
  
  // Create toggle switch
  const toggleSwitch = document.createElement('span');
  toggleSwitch.className = 'toggle-switch';
  toggleSwitch.style.display = 'inline-block';
  toggleSwitch.style.width = '36px';
  toggleSwitch.style.height = '18px';
  toggleSwitch.style.backgroundColor = '#ccc';
  toggleSwitch.style.borderRadius = '9px';
  toggleSwitch.style.marginLeft = '8px';
  toggleSwitch.style.position = 'relative';
  toggleSwitch.style.transition = 'background-color 0.3s';
  
  // Create toggle knob
  const toggleKnob = document.createElement('span');
  toggleKnob.className = 'toggle-knob';
  toggleKnob.style.position = 'absolute';
  toggleKnob.style.top = '2px';
  toggleKnob.style.left = '2px';
  toggleKnob.style.width = '14px';
  toggleKnob.style.height = '14px';
  toggleKnob.style.backgroundColor = 'white';
  toggleKnob.style.borderRadius = '50%';
  toggleKnob.style.transition = 'left 0.3s';
  toggleKnob.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.3)';
  
  // Add label
  const toggleLabel = document.createElement('span');
  toggleLabel.textContent = 'Follow Mode';
  
  // Set data attribute to track state
  viewportToggle.setAttribute('data-enabled', 'true');
  toggleSwitch.style.backgroundColor = '#2196F3';
  toggleKnob.style.left = '20px';
  
  // Add elements to DOM
  toggleSwitch.appendChild(toggleKnob);
  viewportToggle.appendChild(toggleLabel);
  viewportToggle.appendChild(toggleSwitch);
  container.appendChild(viewportToggle);  // Add to container, not block
  
  // Add click event to toggle
  viewportToggle.addEventListener('click', () => {
    const isEnabled = viewportToggle.getAttribute('data-enabled') === 'true';
    const newState = !isEnabled;
    
    // Update toggle appearance
    viewportToggle.setAttribute('data-enabled', newState.toString());
    toggleSwitch.style.backgroundColor = newState ? '#2196F3' : '#ccc';
    toggleKnob.style.left = newState ? '20px' : '2px';
    
    // If turning off, reset viewBox to original
    if (!newState && container.querySelector('svg')) {
      const svgElement = container.querySelector('svg');
      const svgWidth = svgElement.clientWidth;
      const svgHeight = svgElement.clientHeight;
      // Smoothly reset to original view
      gsap.to(svgElement, {
        attr: { viewBox: `0 0 ${svgWidth} ${svgHeight}` },
        duration: 0.5,
        ease: "power2.out"
      });
    }
  });
  
  // Load GSAP for scrolling
  loadGSAP().then(() => initAnimation());
  
  function loadGSAP() {
    return new Promise(resolve => {
      // Load GSAP core
      const gsapScript = document.createElement('script');
      gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      document.head.appendChild(gsapScript);
      
      gsapScript.onload = () => {
        // Load ScrollTrigger and MotionPathPlugin
        const pluginsLoader = Promise.all([
          new Promise(res => {
            const scrollTriggerScript = document.createElement('script');
            scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
            document.head.appendChild(scrollTriggerScript);
            scrollTriggerScript.onload = res;
          }),
          new Promise(res => {
            const motionPathScript = document.createElement('script');
            motionPathScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/MotionPathPlugin.min.js';
            document.head.appendChild(motionPathScript);
            motionPathScript.onload = res;
          })
        ]);
        
        pluginsLoader.then(resolve);
      };
    });
  }
  
  function initAnimation() {
    // Register plugins
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    
    // Get the road path element for calculations
    const roadPath = document.getElementById('roadPath');
    const pathLength = roadPath.getTotalLength();
    
    // Track previous progress for direction detection
    let previousProgress = 0;
    
    // Set initial position at the start of the path
    const startPoint = roadPath.getPointAtLength(0);
    movingPerson.setAttribute('transform', `translate(${startPoint.x - 20.5}, ${startPoint.y - 27}) scale(3.5)`);
    
    // Get the SVG element for viewport manipulation
    const svgElement = container.querySelector('svg');
    
    // Set initial viewBox to show the entire road map
    const svgWidth = svgElement.clientWidth;
    const svgHeight = svgElement.clientHeight;
    svgElement.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
    
    // Save original viewBox for reference
    const originalViewBox = {
      width: svgWidth,
      height: svgHeight
    };
    
    // Create a timeline for motion path animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=3000",
        scrub: 0.8, // Smoother scrubbing for better path following
        pin: true,
        onUpdate: self => {
          const baseProgress = self.progress || 0;
          
          // Determine if we're moving backwards
          const isMovingBackwards = baseProgress < previousProgress;
          
          // Get current position of the person along the path
          const currentPathPoint = baseProgress * pathLength;
          const personPoint = roadPath.getPointAtLength(currentPathPoint);
          
          // Only apply viewport tracking if it's enabled
          const viewportToggle = document.querySelector('.viewport-toggle');
          const isViewportTrackingEnabled = viewportToggle && viewportToggle.getAttribute('data-enabled') === 'true';
          
          if (isViewportTrackingEnabled) {
            // Calculate zoom level based on progress (zoom in more as we progress)
            // Scale between 1 (no zoom) and 3 (max zoom)
            const zoomLevel = 1 + (baseProgress * 1.5);
            
            // Calculate the new viewBox width and height based on zoom level
            const newViewBoxWidth = originalViewBox.width / zoomLevel;
            const newViewBoxHeight = originalViewBox.height / zoomLevel;
            
            // Center the viewBox on the person's position, with some look-ahead
            // Look-ahead increases as we progress to see more of what's coming
            const lookAheadFactor = baseProgress * 0.2; // Increases as we progress
            const lookAheadX = isMovingBackwards ? -lookAheadFactor * 100 : lookAheadFactor * 100;
            
            // Center point calculation with look-ahead
            const centerX = Math.max(0, Math.min(svgWidth - newViewBoxWidth/2, personPoint.x + lookAheadX - newViewBoxWidth/2));
            const centerY = Math.max(0, Math.min(svgHeight - newViewBoxHeight/2, personPoint.y - newViewBoxHeight/2));
            
            // Apply the new viewBox with smooth transition using GSAP
            gsap.to(svgElement, {
              attr: { 
                viewBox: `${centerX} ${centerY} ${newViewBoxWidth} ${newViewBoxHeight}` 
              },
              duration: 0.3,
              ease: "power1.out",
              overwrite: "auto"
            });
          }
          
          // Show checkpoint markers and dialogue boxes based on progress
          for (let i = 0; i < colorStops.length; i++) {
            const checkpointMarker = document.querySelector(`.checkpoint-marker[data-position="${colorStops[i].position}"]`);
            const dialogueBox = checkpointMarker.querySelector('.dialogue-box');
            
            if (checkpointMarker) {
              if (isMovingBackwards) {
                // When moving backwards, only show markers and dialogues up to the current position
                if (baseProgress >= colorStops[i].position) {
                  checkpointMarker.style.opacity = '1';
                  
                  // Once a checkpoint is passed, keep its dialogue box visible
                  if (dialogueBox) {
                    // For the Interview Process (first checkpoint), only show dialogue
                    // box when we have some progress (not at the very beginning)
                    if (i === 0 && baseProgress < 0.03) {
                      dialogueBox.style.display = 'none';
                    } else {
                      dialogueBox.style.display = 'block';
                    }
                  }
                } else {
                  checkpointMarker.style.opacity = '0';
                  if (dialogueBox) dialogueBox.style.display = 'none';
                }
              } else {
                // When moving forwards, show markers as before
                if (baseProgress >= colorStops[i].position) {
                  checkpointMarker.style.opacity = '1';
                  
                  // Once a checkpoint is passed, keep its dialogue box visible
                  if (dialogueBox) {
                    // For the Interview Process (first checkpoint), only show dialogue
                    // box when we have some progress (not at the very beginning)
                    if (i === 0 && baseProgress < 0.03) {
                      dialogueBox.style.display = 'none';
                    } else {
                      dialogueBox.style.display = 'block';
                    }
                  }
                }
              }
            }
          }
          
          // Update previous progress for next comparison
          previousProgress = baseProgress;
        }
      }
    });
    
    // Use motionPath to follow the road exactly
    tl.to(movingPerson, {
      motionPath: {
        path: roadPath,
        align: roadPath,
        alignOrigin: [0.5, 0.5],
        autoRotate: false,  // We don't need rotation for the person
        start: 0,
        end: 1
      },
      ease: "none",
      immediateRender: true
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
        const markerBBox = movingPerson.getBBox();
        debugPanel.innerHTML = `Progress: ${(progress * 100).toFixed(1)}%<br>Pos: (${markerBBox.x + markerBBox.width/2}, ${markerBBox.y + markerBBox.height/2})`;
      }, 100);
    }
  }
}

