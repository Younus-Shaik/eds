// Utility function for setting multiple attributes
function setAttributes(element, attributes) {
  Object.entries(attributes).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      element.setAttribute(key, value);
    }
  });
  return element;
}

export default function decorate(block) {
  // Create the container for our roadmap
  const container = document.createElement('div');
  container.className = 'roadmap-container';
  
  // Create SVG element
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  setAttributes(svg, {
    'viewBox': '0 0 1200 600',
    'width': '100%',
    'height': '100%'
  });
  
  // Create the path data (keeping the original path)
  const pathData = 'M100,400 C200,200 350,500 450,200 C550,0 650,500 750,200 C850,0 950,250 1150,400';
  
  // Create a vertical path for mobile devices
  const mobilePathData = 'M400,100 C200,200 500,350 200,450 C0,550 500,650 200,750 C0,850 250,950 400,1150';

   // Create the person silhouette
   const personPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
   setAttributes(personPath, {
     'd': 'M15.5 7.5C13.43 7.5 11.75 9.43 11.75 11.5C11.75 13.57 13.43 15.5 15.5 15.5C17.57 15.5 19.25 13.57 19.25 11.5C19.25 9.43 17.57 7.5 15.5 7.5ZM10.375 20.625C10.375 20.625 8.75 20.625 8.75 22.25C8.75 23.875 10.375 27.5 15.5 27.5C20.625 27.5 22.25 23.875 22.25 22.25C22.25 20.625 20.625 20.625 20.625 20.625H10.375Z',
     'fill': '#333333',
     'class': 'current-icon person-icon'
   });
   
   // Create the book icon
   const learnPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
   setAttributes(learnPath, {
     'd': 'M14.5 2H9l-.35.15-.65.64-.65-.64L7 2H1.5l-.5.5v10l.5.5h5.29l.86.85h.7l.86-.85h5.29l.5-.5v-10l-.5-.5zm-7 10.32l-.18-.17L7 12H2V3h4.79l.74.74-.03 8.58zM14 12H9l-.35.15-.14.13V3.7l.7-.7H14v9zM6 5H3v1h3V5zm0 4H3v1h3V9zM3 7h3v1H3V7zm10-2h-3v1h3V5zm-3 2h3v1h-3V7zm0 2h3v1h-3V9z',
     'fill': '#333333',
     'transform': 'translate(10, 7) scale(0.8)',
     'class': 'learn-icon'
   });

  // Create the enablement icon
  const enablementPath = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  setAttributes(enablementPath, {
    'class': 'enablement-icon',
    'transform': 'translate(8, 3) scale(0.7)'
  });
  
  const enablementMain = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  setAttributes(enablementMain, {
    'd': 'M12 4a1 1 0 0 0-1 1c0 1.692-2.046 2.54-3.243 1.343a1 1 0 1 0-1.414 1.414C7.54 8.954 6.693 11 5 11a1 1 0 1 0 0 2c1.692 0 2.54 2.046 1.343 3.243a1 1 0 0 0 1.414 1.414C8.954 16.46 11 17.307 11 19a1 1 0 1 0 2 0c0-1.692 2.046-2.54 3.243-1.343a1 1 0 0 0 1.414-1.414C16.46 15.046 17.307 13 19 13a1 1 0 1 0 0-2c-1.692 0-2.54-2.046-1.343-3.243a1 1 0 0 0-1.414-1.414C15.046 7.54 13 6.693 13 5a1 1 0 0 0-1-1zm-2.992.777a3 3 0 0 1 5.984 0 3 3 0 0 1 4.23 4.231 3 3 0 0 1 .001 5.984 3 3 0 0 1-4.231 4.23 3 3 0 0 1-5.984 0 3 3 0 0 1-4.231-4.23 3 3 0 0 1 0-5.984 3 3 0 0 1 4.231-4.231z',
    'fill': '#333333'
  });

  const enablementCenter = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  setAttributes(enablementCenter, {
    'd': 'M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-2.828-.828a4 4 0 1 1 5.656 5.656 4 4 0 0 1-5.656-5.656z',
    'fill': '#333333'
  });

  enablementPath.appendChild(enablementMain);
  enablementPath.appendChild(enablementCenter);

  // Create the deployment icon
  const deploymentPath = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  setAttributes(deploymentPath, {
    'class': 'deployment-icon',
    'transform': 'translate(3, 3) scale(0.6)'
  });

  // Create the outer rectangle
  const deploymentRect = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  setAttributes(deploymentRect, {
    'd': 'M27 5H5c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h22c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2',
    'fill': 'none',
    'stroke': '#333333',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round'
  });

  // Create the horizontal line
  const horizontalLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  setAttributes(horizontalLine, {
    'd': 'M3 11h26',
    'stroke': '#333333',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round'
  });

  // Create the dots
  const dots = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  setAttributes(dots, {
    'd': 'M7 9c-.3 0-.5-.1-.7-.3S6 8.3 6 8s.1-.5.3-.7l.1-.1c.1 0 .1-.1.2-.1.1-.1.1-.1.2-.1h.4c.1 0 .1 0 .2.1.1 0 .1.1.2.1l.1.1c.1.1.2.2.2.3.1.1.1.3.1.4s0 .3-.1.4c0 .1-.1.2-.2.3-.2.2-.4.3-.7.3m3 0c-.3 0-.5-.1-.7-.3S9 8.3 9 8c0-.1 0-.3.1-.4s.1-.2.2-.3.2-.2.3-.2c.4-.2.8-.1 1.1.2.1.1.2.2.2.3.1.1.1.3.1.4 0 .3-.1.5-.3.7s-.4.3-.7.3m3 0c-.1 0-.3 0-.4-.1s-.2-.1-.3-.2-.2-.2-.2-.3c-.1-.1-.1-.3-.1-.4s0-.3.1-.4.1-.2.2-.3c.4-.4 1-.4 1.4 0 .1.1.2.2.2.3.1.1.1.3.1.4s0 .3-.1.4-.1.2-.2.3c-.2.2-.4.3-.7.3',
    'fill': '#333333'
  });

  // Create the arrows and diagonal line
  const arrows = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  setAttributes(arrows, {
    'd': 'M11 16l-3 3 3 3m10-6l3 3-3 3m-3-7l-4 8',
    'fill': 'none',
    'stroke': '#333333',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round'
  });

  deploymentPath.appendChild(deploymentRect);
  deploymentPath.appendChild(horizontalLine);
  deploymentPath.appendChild(dots);
  deploymentPath.appendChild(arrows);

  // Create the scroller hat icon
  const scrollerHatPath = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  setAttributes(scrollerHatPath, {
    'class': 'scroller-hat-icon',
    'transform': 'translate(5, 5) scale(0.4)'
  });

  // Create the main hat shape
  const hatMain = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  setAttributes(hatMain, {
    'd': 'M65.635,24.988l-30-10.037c-0.412-0.139-0.857-0.139-1.27,0l-30,10.037C3.539,25.265,2.987,26.044,3,26.915s0.589,1.634,1.423,1.885l8.16,2.458v6.627c0,0.498,0.403,0.979,0.739,1.348c0.185,0.203,1.385,1.24,2.549,1.715c0.248,0.102,0.503,0.149,0.755,0.149c0.789,0,1.428-0.471,1.744-1.246c0.417-1.022-0.183-2.189-1.205-2.606c-0.093-0.038,0.418-0.126-0.582-0.234v-4.535l3,0.92v16.129C18.645,50.032,18,51.013,18,52.153c0,1.656,1.343,3,3,3s3-1.344,3-3c0-0.55-0.159-1.059-0.417-1.501V34.622l3.858,1.183l7,2.037c0.183,0.054,0.371,0.08,0.559,0.08c0.194,0,0.389-0.028,0.577-0.085l16.006-4.822v4.465c-1,1.22-6.533,4.442-17.287,4.442c-2.417,0-4.24-0.116-6.02-0.356c-1.096-0.138-2.102,0.621-2.249,1.716c-0.147,1.095,0.621,2.102,1.715,2.249c1.958,0.264,4.173,0.392,6.77,0.392c15.159,0,20.533-5.938,20.763-6.19c0.336-0.368,0.307-0.849,0.307-1.348v-6.349c0-0.075-0.014-0.146-0.022-0.219L65.577,28.8c0.834-0.251,1.409-1.014,1.423-1.885C67.013,26.044,66.461,25.265,65.635,24.988z',
    'fill': '#333333'
  });

  // Create the middle section
  const hatMiddle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  setAttributes(hatMiddle, {
    'd': 'M34.99,33.836l-6.404-1.863l-2.53-0.776l9.887-3.468c1.041-0.37,1.774-1.515,1.403-2.555c-0.371-1.041-1.571-1.584-2.61-1.213L21.129,28.77c-0.352,0.125-0.689,0.345-0.962,0.621l-4.699-1.441l-3.865-1.164L35,18.957l23.397,7.828L34.99,33.836z',
    'fill': '#333333'
  });

  // Create the small circles
  const hatCircle1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  setAttributes(hatCircle1, {
    'd': 'M40.61,30.482c0.096,0,0.193-0.014,0.289-0.043L45.677,29c0.529-0.159,0.829-0.717,0.669-1.245c-0.159-0.528-0.717-0.834-1.245-0.669l-4.778,1.439c-0.528,0.159-0.828,0.717-0.669,1.245C39.784,30.203,40.181,30.482,40.61,30.482z',
    'fill': '#333333'
  });

  const hatCircle2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  setAttributes(hatCircle2, {
    'd': 'M48.887,28.074c0.095,0,0.192-0.014,0.288-0.043l2.227-0.671c0.529-0.159,0.829-0.717,0.669-1.245c-0.159-0.528-0.716-0.832-1.245-0.669l-2.227,0.671c-0.529,0.159-0.829,0.717-0.669,1.245C48.06,27.795,48.457,28.074,48.887,28.074z',
    'fill': '#333333'
  });

  scrollerHatPath.appendChild(hatMain);
  scrollerHatPath.appendChild(hatMiddle);
  scrollerHatPath.appendChild(hatCircle1);
  scrollerHatPath.appendChild(hatCircle2);

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
  setAttributes(roadLayer, { 'id': 'road-layer' });
  
  const stopsLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  setAttributes(stopsLayer, { 'id': 'stops-layer' });
  
  const markerLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  setAttributes(markerLayer, { 'id': 'marker-layer' });
  markerLayer.style.zIndex = '-1'; // Ensure moving person stays behind markers
  
  // Create checkpoint markers (fixed pin and ellipse at each point)
  const checkpointMarkersLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  setAttributes(checkpointMarkersLayer, { 'id': 'checkpoint-markers-layer' });
  checkpointMarkersLayer.style.zIndex = '1'; // Ensure markers stay in front
  
  // Create the road elements
  const roadShadow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  setAttributes(roadShadow, {
    'd': pathData,
    'class': 'road-shadow',
    'id': 'roadShadowPath'
  });
  
  const roadMain = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  setAttributes(roadMain, {
    'd': pathData,
    'class': 'road-main'
  });
  
  const roadMarkings = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  setAttributes(roadMarkings, {
    'd': pathData,
    'class': 'road-markings'
  });
  
  // Add road elements to SVG
  svg.appendChild(roadShadow);
  svg.appendChild(roadMain);
  svg.appendChild(roadMarkings);
  
  // Create the main path for animation
  const roadPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  setAttributes(roadPath, {
    'd': pathData,
    'stroke': 'none',
    'fill': 'none',
    'id': 'roadPath'
  });
  svg.appendChild(roadPath);
  
  // Check if we're on mobile and update paths if needed
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    roadShadow.setAttribute('d', mobilePathData);
    roadMain.setAttribute('d', mobilePathData);
    roadMarkings.setAttribute('d', mobilePathData);
    roadPath.setAttribute('d', mobilePathData);
  }
  
  // Create stop points
  function createStopPoint(position) {
    const roadPathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    // Use the appropriate path data based on device type
    setAttributes(roadPathElement, { 'd': isMobile ? mobilePathData : pathData });
    const pathLength = roadPathElement.getTotalLength();
    const point = roadPathElement.getPointAtLength(position * pathLength);
    
    // Create stop marker
    const stopPoint = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    // Outer circle (white border)
    const outerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    setAttributes(outerCircle, {
      'cx': point.x.toString(),
      'cy': point.y.toString(),
      'r': '12',
      'class': 'stop-point-outer'
    });
    
    // Inner circle
    const innerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    setAttributes(innerCircle, {
      'cx': point.x.toString(),
      'cy': point.y.toString(),
      'r': '6',
      'class': 'stop-point-inner'
    });
    
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
    // Use the appropriate path data based on device type
    setAttributes(roadPath, { 'd': isMobile ? mobilePathData : pathData });
    const pathLength = roadPath.getTotalLength();
    const point = roadPath.getPointAtLength(colorStops[i].position * pathLength);
    
    // Create checkpoint marker (pin and ellipse)
    const checkpointMarker = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    setAttributes(checkpointMarker, {
      'class': 'checkpoint-marker',
      'data-position': colorStops[i].position.toString()
    });
    
    // Create the pin shape
    const pinPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    setAttributes(pinPath, {
      'd': 'M30.66 19C28.415 26.625 15.788 38.125 15.788 38.125C15.788 38.125 0.529 26.5 0.038 18.25C-0.587 7.75 6.538 0.625 15.788 0C25.038 0.75 32.413 9 30.66 19Z',
      'fill': colorStops[i].color
    });
    
    // Create the white circle background
    const innerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    setAttributes(innerCircle, {
      'cx': '15.66',
      'cy': '15.625',
      'rx': '11.25',
      'ry': '11.125',
      'fill': 'white'
    });
    
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
    if (isMobile) {
      // Mobile view - position dialogue boxes to the right of checkpoints for vertical path
      if (i === 0) {
        // First checkpoint (Interview Process)
        setAttributes(foreignObject, {
          'x': '50',
          'y': '-20'
        });
      } else if (i === colorStops.length - 1) {
        // Last checkpoint (Completion)
        setAttributes(foreignObject, {
          'x': '50',
          'y': '-20'
        });
      } else if (colorStops[i].position === 0.25) {
        // Training checkpoint
        setAttributes(foreignObject, {
          'x': '50',
          'y': '-20'
        });
      } else if (colorStops[i].position === 0.5) {
        // Enablement checkpoint
        setAttributes(foreignObject, {
          'x': '50',
          'y': '-20'
        });
      } else if (colorStops[i].position === 0.75) {
        // Live project checkpoint
        setAttributes(foreignObject, {
          'x': '50',
          'y': '-20'
        });
      }
    } else {
      // Desktop view - original positioning
      if (i % 2 === 0) {
        // Above the checkpoint
        if (i === 0) {
          // First checkpoint (Interview Process) - position to the right and higher
          setAttributes(foreignObject, {
            'x': '0',
            'y': '-100'
          });
        } else if (i === colorStops.length - 1) {
          // Last checkpoint (Completion) - position to the bottom
          setAttributes(foreignObject, {
            'x': '-65',
            'y': '70'
          });
        } else if (colorStops[i].position === 0.5) {
          // Enablement checkpoint - position to the bottom
          setAttributes(foreignObject, {
            'x': '-40',
            'y': '80'
          });
        } else if(colorStops[i].position === 0.75){
          // Live project checkpoint - position to the bottom
          setAttributes(foreignObject, {
            'x': '-25',
            'y': '-10'
          });
        }
      } else {
        // Below the checkpoint - position lower but not too far
        setAttributes(foreignObject, {
          'x': '-45',
          'y': '90'
        });
      }
    }
    
    setAttributes(foreignObject, {
      'width': boxWidth.toString(),
      'height': boxHeight.toString(),
      'class': 'dialogue-box',
      'data-position': colorStops[i].position.toString()
    });
    
    // Create HTML content for the foreign object - Adobe style improvements
    const htmlDiv = document.createElement('div');
    htmlDiv.className = 'dialogue-html-container';
    
    // Create pointer
    const pointer = document.createElement('div');
    pointer.className = `dialogue-pointer dialogue-pointer-${i % 2 === 0 ? 'bottom' : 'top'}`;
    
    const pointerInner = document.createElement('div');
    pointerInner.className = 'dialogue-pointer-inner';
    pointer.appendChild(pointerInner);
    
    // Create header container
    const headerContainer = document.createElement('div');
    headerContainer.className = 'dialogue-header-container';
    
    // Create icon badge
    const iconBadge = document.createElement('div');
    iconBadge.className = 'dialogue-icon-badge';
    iconBadge.style.backgroundColor = colorStops[i].color;
    
    // Create step number
    const stepNumber = document.createElement('div');
    stepNumber.className = 'dialogue-step-number';
    stepNumber.textContent = i + 1;
    
    // Create heading
    const heading = document.createElement('div');
    heading.className = 'dialogue-heading';
    heading.textContent = colorStops[i].title;
    
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    
    const progressFill = document.createElement('div');
    progressFill.className = 'progress-fill';
    progressFill.style.width = `${(i+1)/(colorStops.length)*100}%`;
    progressFill.style.backgroundColor = colorStops[i].color;
    
    progressBar.appendChild(progressFill);
    
    // Create content container
    const contentContainer = document.createElement('div');
    contentContainer.className = 'dialogue-content-container';
    
    // Create items
    const displayItems = colorStops[i].content.slice(0, 2);
    displayItems.forEach((item, index) => {
      const itemRow = document.createElement('div');
      itemRow.className = 'dialogue-item-row';
      
      const checkIcon = document.createElement('div');
      checkIcon.className = 'dialogue-check-icon';
      checkIcon.innerHTML = '✓';
      
      const textSpan = document.createElement('span');
      textSpan.className = 'dialogue-text-span';
      let displayText = item.length > 24 ? item.substring(0, 22) + '...' : item;
      textSpan.textContent = displayText;
      textSpan.setAttribute('title', item);
      
      itemRow.appendChild(checkIcon);
      itemRow.appendChild(textSpan);
      contentContainer.appendChild(itemRow);
    });
    
    // Create more row if needed
    if (colorStops[i].content.length > 2) {
      const moreRow = document.createElement('div');
      moreRow.className = 'dialogue-more-row';
      
      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'dialogue-dots-container';
      
      for (let j = 0; j < 3; j++) {
        const dot = document.createElement('div');
        dot.className = 'dialogue-dot';
        dot.style.backgroundColor = colorStops[i].color;
        dotsContainer.appendChild(dot);
      }
      
      moreRow.appendChild(dotsContainer);
      contentContainer.appendChild(moreRow);
    }
    
    // Create ribbon for active checkpoint
    const ribbon = document.createElement('div');
    ribbon.className = 'dialogue-ribbon';
    ribbon.style.backgroundColor = colorStops[i].color;
    
    // Assemble the dialogue box
    iconBadge.appendChild(stepNumber);
    headerContainer.appendChild(iconBadge);
    headerContainer.appendChild(heading);
    
    htmlDiv.appendChild(pointer);
    htmlDiv.appendChild(headerContainer);
    htmlDiv.appendChild(progressBar);
    htmlDiv.appendChild(contentContainer);
    htmlDiv.appendChild(ribbon);
    
    // Add the dialogue box to the marker
    foreignObject.appendChild(htmlDiv);
    checkpointMarker.appendChild(foreignObject);
    
    // Initially hide all markers and dialogue boxes except the first one
    if (i > 0) {
      checkpointMarker.classList.add('marker-hidden');
      foreignObject.classList.add('dialogue-hidden');
    } else {
      // For the first checkpoint (Interview Process), show the marker but hide the dialogue box
      checkpointMarker.classList.add('marker-visible');
      foreignObject.classList.add('dialogue-hidden');
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
  
  // Create background circle
  const backgroundCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  backgroundCircle.setAttribute('cx', '8');
  backgroundCircle.setAttribute('cy', '8');
  backgroundCircle.setAttribute('r', '7.5');
  backgroundCircle.classList.add('background-circle');
  
  // Add circle to the moving group
  movingPerson.appendChild(backgroundCircle);
  
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
  
  // Create the controls container
  const controlsContainer = document.createElement('div');
  controlsContainer.className = 'roadmap-controls';
  container.appendChild(controlsContainer);

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
    
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768;
    
    // Get the road path element for calculations
    const roadPath = document.getElementById('roadPath');
    
    // Update the path data for mobile if needed
    if (isMobile) {
      roadPath.setAttribute('d', mobilePathData);
      // Update SVG viewBox for vertical orientation
      const svgElement = container.querySelector('svg');
      svgElement.setAttribute('viewBox', '0 0 600 1200');
    }
    
    const pathLength = roadPath.getTotalLength();
    
    // Track previous progress for direction detection
    let previousProgress = 0;
    
    // Set initial position at the start of the path
    const startPoint = roadPath.getPointAtLength(0);
    movingPerson.setAttribute('transform', `translate(${startPoint.x - 20.5}, ${startPoint.y - 27}) scale(3.5)`);
    
    // Get the SVG element for viewport manipulation
    const svgElement = container.querySelector('svg');
    
    // Set initial viewBox
    const svgWidth = svgElement.clientWidth;
    const svgHeight = svgElement.clientHeight;
    
    // For mobile, we'll use a different approach with a zoomed-in view that follows the path
    if (isMobile) {
      // Set initial viewBox to focus on the start of the path
      const mobileViewBoxWidth = 400; // Narrower view for mobile
      const mobileViewBoxHeight = 600; // Taller view for vertical scrolling
      svgElement.setAttribute('viewBox', `${Math.max(0, startPoint.x - mobileViewBoxWidth/2)} ${Math.max(0, startPoint.y - mobileViewBoxHeight/4)} ${mobileViewBoxWidth} ${mobileViewBoxHeight}`);
    } else {
      // Desktop view shows the entire roadmap
      svgElement.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
    }
    
    // Create a timeline for motion path animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: isMobile ? "+=4000" : "+=3000", // Longer scrolling distance for mobile vertical path
        scrub: 0.8, // Smoother scrubbing for better path following
        pin: true,
        onUpdate: self => {
          const baseProgress = self.progress || 0;
          
          // Determine if we're moving backwards
          const isMovingBackwards = baseProgress < previousProgress;
          
          // Get current position of the person along the path
          const currentPathPoint = baseProgress * pathLength;
          const personPoint = roadPath.getPointAtLength(currentPathPoint);
          
          // For mobile view, update the viewBox to follow the person
          if (isMobile) {
            const mobileViewBoxWidth = 400;
            const mobileViewBoxHeight = 400;
            
            // Calculate new viewBox position centered on the current person position
            const newX = Math.max(0, personPoint.x - mobileViewBoxWidth/2);
            const newY = Math.max(0, personPoint.y - mobileViewBoxHeight/2);
            
            // Smoothly update the viewBox to follow the person
            gsap.to(svgElement, {
              attr: { 
                viewBox: `${newX} ${newY} ${mobileViewBoxWidth} ${mobileViewBoxHeight}` 
              },
              duration: 0.3,
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
                  checkpointMarker.classList.remove('marker-hidden');
                  checkpointMarker.classList.add('marker-visible');
                  
                  // Once a checkpoint is passed, keep its dialogue box visible
                  if (dialogueBox) {
                    // For the Interview Process (first checkpoint), only show dialogue
                    // box when we have some progress (not at the very beginning)
                    if (i === 0 && baseProgress < 0.03) {
                      dialogueBox.classList.remove('dialogue-visible');
                      dialogueBox.classList.add('dialogue-hidden');
                    } else {
                      dialogueBox.classList.remove('dialogue-hidden');
                      dialogueBox.classList.add('dialogue-visible');
                    }
                  }
                } else {
                  checkpointMarker.classList.remove('marker-visible');
                  checkpointMarker.classList.add('marker-hidden');
                  if (dialogueBox) {
                    dialogueBox.classList.remove('dialogue-visible');
                    dialogueBox.classList.add('dialogue-hidden');
                  }
                }
              } else {
                // When moving forwards, show markers as before
                if (baseProgress >= colorStops[i].position) {
                  checkpointMarker.classList.remove('marker-hidden');
                  checkpointMarker.classList.add('marker-visible');
                  
                  // Once a checkpoint is passed, keep its dialogue box visible
                  if (dialogueBox) {
                    // For the Interview Process (first checkpoint), only show dialogue
                    // box when we have some progress (not at the very beginning)
                    if (i === 0 && baseProgress < 0.03) {
                      dialogueBox.classList.remove('dialogue-visible');
                      dialogueBox.classList.add('dialogue-hidden');
                    } else {
                      dialogueBox.classList.remove('dialogue-hidden');
                      dialogueBox.classList.add('dialogue-visible');
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
    
    // Handle window resize to update mobile/desktop view
    window.addEventListener('resize', () => {
      const newIsMobile = window.innerWidth <= 768;
      
      // Only update if the device type changed
      if (newIsMobile !== isMobile) {
        // Update all path elements with the appropriate path data
        if (newIsMobile) {
          // Switch to vertical mobile path
          document.getElementById('roadPath').setAttribute('d', mobilePathData);
          document.getElementById('roadShadowPath').setAttribute('d', mobilePathData);
          document.querySelectorAll('.road-main, .road-markings').forEach(path => {
            path.setAttribute('d', mobilePathData);
          });
          
          // Update SVG viewBox for vertical orientation
          const svgElement = container.querySelector('svg');
          svgElement.setAttribute('viewBox', '0 0 600 1200');
          
          // Update container height
          container.style.height = '150vh';
          container.style.maxHeight = 'none';
        } else {
          // Switch back to horizontal desktop path
          document.getElementById('roadPath').setAttribute('d', pathData);
          document.getElementById('roadShadowPath').setAttribute('d', pathData);
          document.querySelectorAll('.road-main, .road-markings').forEach(path => {
            path.setAttribute('d', pathData);
          });
          
          // Reset SVG viewBox
          const svgElement = container.querySelector('svg');
          svgElement.setAttribute('viewBox', '0 0 1200 600');
          
          // Reset container height
          container.style.height = '100vh';
          container.style.maxHeight = '800px';
        }
        
        // Force refresh by reloading the page to reinitialize the animation
        window.location.reload();
      }
    });
    
    // Add debug panel if needed
    if (window.location.search.includes('debug')) {
      const debugPanel = document.createElement('div');
      debugPanel.className = 'debug-panel';
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

