import { setAttributes, loadSvgIcon } from '../../utils/svg-parser.js';

export default async function decorate(block) {
  // Create the main container for the roadmap
  const container = document.createElement('div');
  container.className = 'roadmap-container';
  
  // Initialize SVG canvas with viewBox for responsive scaling
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  setAttributes(svg, {
    'viewBox': '0 0 1200 600',
    'width': '100%',
    'height': '100%'
  });
  
  // Define path data for desktop and mobile views
  const pathData = 'M100,400 C200,200 350,500 450,200 C550,0 650,500 750,200 C850,0 950,250 1150,400';
  const mobilePathData = 'M400,100 C200,200 500,350 200,450 C0,550 500,650 200,750 C0,850 250,950 400,1150';

  // Define paths for SVG icons used in checkpoints
  const iconPaths = {
    person: '/icons/person.svg',
    book: '/icons/book.svg',
    enablement: '/icons/enablement.svg',
    deployment: '/icons/deployment.svg',
    hat: '/icons/hat.svg'
  };

  // Load and process SVG icons
  const loadedIcons = {};
  let iconLoadError = false;

  try {
    // Load all icons in parallel
    const [personIcon, bookIcon, enablementIcon, deploymentIcon, hatIcon] = await Promise.all([
      loadSvgIcon(iconPaths.person),
      loadSvgIcon(iconPaths.book),
      loadSvgIcon(iconPaths.enablement),
      loadSvgIcon(iconPaths.deployment),
      loadSvgIcon(iconPaths.hat)
    ]);

    // Process each icon and set its attributes
    // Person icon processing
    if (personIcon) {
      loadedIcons.personPath = personIcon.querySelector('path');
      setAttributes(loadedIcons.personPath, {
        'fill': '#333333',
        'class': 'current-icon person-icon'
      });
    } else {
      iconLoadError = true;
    }

    // Book icon processing
    if (bookIcon) {
      loadedIcons.learnPath = bookIcon.querySelector('path');
      setAttributes(loadedIcons.learnPath, {
        'fill': '#333333',
        'transform': 'translate(10, 7) scale(0.8)',
        'class': 'learn-icon'
      });
    } else {
      iconLoadError = true;
    }

    // Enablement icon processing
    if (enablementIcon) {
      loadedIcons.enablementPath = enablementIcon.querySelector('g');
      setAttributes(loadedIcons.enablementPath, {
        'class': 'enablement-icon',
        'transform': 'translate(8, 3) scale(0.7)'
      });
    } else {
      iconLoadError = true;
    }

    // Deployment icon processing
    if (deploymentIcon) {
      loadedIcons.deploymentPath = deploymentIcon.querySelector('g');
      setAttributes(loadedIcons.deploymentPath, {
        'class': 'deployment-icon',
        'transform': 'translate(3, 3) scale(0.6)'
      });
    } else {
      iconLoadError = true;
    }

    // Graduation hat icon processing
    if (hatIcon) {
      loadedIcons.scrollerHatPath = hatIcon.querySelector('g');
      setAttributes(loadedIcons.scrollerHatPath, {
        'class': 'scroller-hat-icon',
        'transform': 'translate(5, 5) scale(0.4)'
      });
    } else {
      iconLoadError = true;
    }

    if (iconLoadError) {
      console.warn('One or more icons failed to load. Please check the icon paths.');
    }

    // Define checkpoint data with positions, colors, and content
    const colorStops = [
      {
        position: 0.0,
        path: loadedIcons.personPath,
        title: "Interview Process",
        content: ["Complete screening application", "Attend technical interview", "Meet with hiring manager"],
        color: '#FF5500'
      },
      { position: 0.25, path: loadedIcons.learnPath, title: "Training On Tech", content: ["Learn fundamentals of web development", "Practice with Adobe tools", "Complete assigned tutorials"], color: '#4CAF50' },
      { position: 0.5, path: loadedIcons.enablementPath, title: "Enablement", content: ["Access to Adobe Creative Cloud", "System configuration", "Permission setup for development"], color: '#2196F3' },
      { position: 0.75, path: loadedIcons.deploymentPath, title: "Live Project", content: ["Collaborate with team members", "Implement customer features", "Present progress in sprint reviews"], color: '#9C27B0' },
      { position: 1.0, path: loadedIcons.scrollerHatPath, title: "Completion Of Apprenticeship", content: ["Final project presentation", "Manager evaluation", "Certificate of completion"], color: '#FF9800' }
    ];

    // Create SVG layers for proper stacking order
    const roadLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    setAttributes(roadLayer, { 'id': 'road-layer' });
    
    const stopsLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    setAttributes(stopsLayer, { 'id': 'stops-layer' });
    
    const markerLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    setAttributes(markerLayer, { 'id': 'marker-layer' });
    markerLayer.style.zIndex = '-1';
    
    const checkpointMarkersLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    setAttributes(checkpointMarkersLayer, { 'id': 'checkpoint-markers-layer' });
    checkpointMarkersLayer.style.zIndex = '1';
    
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
        const personIconClone = loadedIcons.personPath.cloneNode(true);
        personIconClone.classList.add('checkpoint-icon');
        personIconClone.classList.add('person-icon');
        checkpointMarker.appendChild(personIconClone);
      }
      
      // Create a foreign object for the dialogue box
      const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
      
      // Calculate size based on content - decrease the size further
      const boxWidth = 90; 
      const boxHeight = 65; 
      
      // Position the dialogue box with more spacing between them
      if (isMobile) {
        // Mobile view - position dialogue boxes to the right of checkpoints for vertical path
        if (i === 0) {
          // First checkpoint (Interview Process)
          setAttributes(foreignObject, {
            'x': '-110',
            'y': '-20'
          });
        } else if (i === colorStops.length - 1) {
          // Last checkpoint (Completion)
          setAttributes(foreignObject, {
            'x': '35',
            'y': '-40'
          });
        } else if (colorStops[i].position === 0.25) {
          // Training checkpoint
          setAttributes(foreignObject, {
            'x': '-90',
            'y': '-50'
          });
        } else if (colorStops[i].position === 0.5) {
          // Enablement checkpoint
          setAttributes(foreignObject, {
            'x': '40',
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
      
      // Create HTML content for the foreign object 
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
    
    /**
     * Initializes the animation with GSAP
     * Sets up ScrollTrigger and motion path animation
     */
    function initAnimation() {
      // Register GSAP plugins for animation
      gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
      
      // Detect mobile device for responsive layout
      const isMobile = window.innerWidth <= 768;
      
      // Get the road path element for motion calculations
      const roadPath = document.getElementById('roadPath');
      
      // Update path data for mobile view if needed
      if (isMobile) {
        roadPath.setAttribute('d', mobilePathData);
        // Adjust SVG viewBox for vertical orientation on mobile
        const svgElement = container.querySelector('svg');
        svgElement.setAttribute('viewBox', '0 0 600 1200');
      }
      
      const pathLength = roadPath.getTotalLength();
      
      // Track progress for direction detection
      let previousProgress = 0;
      
      // Initialize person position at the start of the path
      const startPoint = roadPath.getPointAtLength(0);
      movingPerson.setAttribute('transform', `translate(${startPoint.x - 20.5}, ${startPoint.y - 27}) scale(3.5)`);
      
      // Configure viewport settings
      const svgElement = container.querySelector('svg');
      const svgWidth = svgElement.clientWidth;
      const svgHeight = svgElement.clientHeight;
      
      // Set up mobile-specific viewport configuration
      if (isMobile) {
        const mobileViewBoxWidth = 400;
        const mobileViewBoxHeight = 600;
        svgElement.setAttribute('viewBox', 
          `${Math.max(0, startPoint.x - mobileViewBoxWidth/2)} 
           ${Math.max(0, startPoint.y - mobileViewBoxHeight/4)} 
           ${mobileViewBoxWidth} 
           ${mobileViewBoxHeight}`
        );
      } else {
        // Desktop viewport shows the entire roadmap
        svgElement.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
      }
      
      /**
       * Creates the main animation timeline with ScrollTrigger
       * Handles viewport updates and checkpoint visibility
       */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: isMobile ? "+=4000" : "+=3000", // Longer scroll for mobile
          scrub: 0.8, // Smooth scrolling animation
          pin: true,
          onUpdate: self => {
            const baseProgress = self.progress || 0;
            const isMovingBackwards = baseProgress < previousProgress;
            
            // Calculate current position along the path
            const currentPathPoint = baseProgress * pathLength;
            const personPoint = roadPath.getPointAtLength(currentPathPoint);
            
            // Update mobile viewport to follow the person
            if (isMobile) {
              const mobileViewBoxWidth = 400;
              const mobileViewBoxHeight = 400;
              
              // Center viewport on current person position
              const newX = Math.max(0, personPoint.x - mobileViewBoxWidth/2);
              const newY = Math.max(0, personPoint.y - mobileViewBoxHeight/2);
              
              // Smooth viewport transition
              gsap.to(svgElement, {
                attr: { viewBox: `${newX} ${newY} ${mobileViewBoxWidth} ${mobileViewBoxHeight}` },
                duration: 0.3,
                overwrite: "auto"
              });
            }
            
            // Update checkpoint visibility based on scroll progress
            updateCheckpointVisibility(baseProgress, isMovingBackwards);
            
            previousProgress = baseProgress;
          }
        }
      });
      
      function updateCheckpointVisibility(progress, isMovingBackwards) {
        colorStops.forEach((stop, index) => {
          const checkpointMarker = document.querySelector(
            `.checkpoint-marker[data-position="${stop.position}"]`
          );
          const dialogueBox = checkpointMarker.querySelector('.dialogue-box');
          
          if (checkpointMarker) {
            const shouldShow = isMovingBackwards ? 
              progress >= stop.position : 
              progress >= stop.position;
            
            // Toggle visibility classes
            checkpointMarker.classList.toggle('marker-hidden', !shouldShow);
            checkpointMarker.classList.toggle('marker-visible', shouldShow);
            
            // Handle dialogue box visibility
            if (dialogueBox) {
              const isFirstCheckpoint = index === 0;
              const isAtStart = progress < 0.03;
              
              // Special handling for first checkpoint
              if (isFirstCheckpoint && isAtStart) {
                dialogueBox.classList.remove('dialogue-visible');
                dialogueBox.classList.add('dialogue-hidden');
              } else if (shouldShow) {
                dialogueBox.classList.remove('dialogue-hidden');
                dialogueBox.classList.add('dialogue-visible');
              }
            }
          }
        });
      }
      
      // Configure motion path animation for the person
      tl.to(movingPerson, {
        motionPath: {
          path: roadPath,
          align: roadPath,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
          start: 0,
          end: 1
        },
        ease: "none",
        immediateRender: true
      });
      
      /**
       * Handle window resize events for responsive layout
       * Reinitializes the animation when switching between mobile/desktop views
       */
      window.addEventListener('resize', () => {
        const newIsMobile = window.innerWidth <= 768;
        
        // Only update if device type changed
        if (newIsMobile !== isMobile) {
          updateLayoutForDeviceType(newIsMobile);
          // Force refresh to reinitialize animation
          window.location.reload();
        }
      });
      
      function updateLayoutForDeviceType(isMobile) {
        const paths = [
          document.getElementById('roadPath'),
          document.getElementById('roadShadowPath'),
          ...document.querySelectorAll('.road-main, .road-markings')
        ];
        
        const pathData = isMobile ? mobilePathData : pathData;
        paths.forEach(path => path.setAttribute('d', pathData));
        
        // Update SVG viewBox
        const svgElement = container.querySelector('svg');
        svgElement.setAttribute('viewBox', 
          isMobile ? '0 0 600 1200' : '0 0 1200 600'
        );
        
        // Update container dimensions
        container.style.height = isMobile ? '150vh' : '100vh';
        container.style.maxHeight = isMobile ? 'none' : '800px';
      }
      
      // Add debug panel if debug mode is enabled
      if (window.location.search.includes('debug')) {
        initDebugPanel();
      }
    }
    
  } catch (error) {
    console.error('Error loading icons:', error);
    // Insert a simple error message into the container
    const errorMessage = document.createElement('div');
    errorMessage.className = 'roadmap-error';
    errorMessage.textContent = 'Unable to load the roadmap visualizaton. Please try refreshing the page.';
    container.appendChild(errorMessage);
  }

  // Replace block content with our container
  block.textContent = '';
  block.appendChild(container);
}

