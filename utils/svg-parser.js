// Utility function for setting multiple attributes
export function setAttributes(element, attributes) {
  Object.entries(attributes).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      element.setAttribute(key, value);
    }
  });
  return element;
}

// Helper function to load and parse SVG icons
export async function loadSvgIcon(iconPath) {
  try {
    const response = await fetch(iconPath);
    const svgText = await response.text();
    
    // Create a temporary container
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = svgText.trim();
    
    // Get the SVG element
    const svgElement = tempContainer.querySelector('svg');
    if (!svgElement) {
      throw new Error('No SVG element found in the loaded content');
    }
    
    return svgElement;
  } catch (error) {
    console.error(`Error loading SVG icon from ${iconPath}:`, error);
    return null;
  }
} 