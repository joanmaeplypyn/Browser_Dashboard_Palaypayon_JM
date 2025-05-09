const canvas = document.getElementById('canvas');
const workspace = canvas.getContext('2d');

let circle = [];
let selectedCircle = null;
let isDragging = false;

// Mouse down and select or create a circle
canvas.addEventListener('mousedown', function (e) {
  const { x, y } = getMousePos(e);
  selectedCircle = getCircleAt(x, y);
  
// Allows draggibg when circle is clicked
  if (selectedCircle) {
    selectedCircle.color = 'red';
    isDragging = true;
  } else {
    deselectAll();
    // Add a new circle with a default radius of 20px
    circle.push({ x, y, radius: 20, color: 'skyblue' });
  }

  draw();
});
// Mouse move and drag the selected circle
canvas.addEventListener('mousemove', function (e) {
  if (isDragging && selectedCircle) {
    const { x, y } = getMousePos(e);
    selectedCircle.x = x;
    selectedCircle.y = y;
    draw();
  }
});
// Mouse up and stop dragging
canvas.addEventListener('mouseup', function () {
  isDragging = false;
});
// Mouse wheel and resize the selected circle
canvas.addEventListener('wheel', function (e) {
  if (selectedCircle) {
    e.preventDefault();
    selectedCircle.radius += e.deltaY < 0 ? 2 : -2; 
    if (selectedCircle.radius < 5) selectedCircle.radius = 5; 
    draw();
  }
});
// Delete key and remove selected circle
window.addEventListener('keydown', function (e) {
  if (e.key === 'Delete' && selectedCircle) {
    // Delete the selected circle
    circle = circle.filter(c => c !== selectedCircle);
    selectedCircle = null;
    draw();
  }
});
// Get mouse position relative to the canvas
function getMousePos(evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
// Check if a circle exists at a given position
function getCircleAt(x, y) {
  for (let i = circle.length - 1; i >= 0; i--) {
    const c = circle[i];
    const dx = c.x - x;
    const dy = c.y - y;
    if (Math.sqrt(dx * dx + dy * dy) <= c.radius) {
      return c; // Return the circle that was clicked
    }
  }
  return null;
}
// Deselect all circles
function deselectAll() {
  circle.forEach(c => c.color = 'skyblue');
  selectedCircle = null;
}
// Draw all circles on the canvas
function draw() {
  workspace.clearRect(0, 0, canvas.width, canvas.height);
  circle.forEach(c => {
    workspace.beginPath();
    workspace.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
    workspace.fillStyle = c.color;
    workspace.fill();
  });
}

// Background color animation
const colors = ['#e6f7ff', '#ffe6e6', '#f0fff0', '#f9f9f9', '#fff0f5', '#fffacd'];
let currentColor = 0;
setInterval(() => {
  document.body.style.backgroundColor = colors[currentColor];
  currentColor = (currentColor + 1) % colors.length;
}, 3000);
