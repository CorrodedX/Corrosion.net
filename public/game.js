// Select buttons
const moveLeftButton = document.getElementById('move-left');
const moveRightButton = document.getElementById('move-right');
const jumpButton = document.getElementById('jump');
const swingBatButton = document.getElementById('swing-bat');

// Game state (example)
const player = {
    x: 400,
    y: 300,
    width: 50,
    height: 50,
    color: 'blue'
};

// Get canvas and context
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Draw player
function drawPlayer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Button actions
moveLeftButton.addEventListener('click', () => {
    player.x -= 10; // Move player to the left
    drawPlayer();
});

moveRightButton.addEventListener('click', () => {
    player.x += 10; // Move player to the right
    drawPlayer();
});

jumpButton.addEventListener('click', () => {
    player.y -= 50; // Jump up
    drawPlayer();
    setTimeout(() => {
        player.y += 50; // Gravity effect
        drawPlayer();
    }, 300);
});

swingBatButton.addEventListener('click', () => {
    alert('Swinging the bat!'); // Replace with actual bat-swinging logic
});

// Initial draw
drawPlayer();
