// Minimal Randy Run Starter
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 450,
  backgroundColor: '#1b1f2a',
  physics: { default: 'arcade', arcade: { gravity: { y: 1200 }, debug: false } },
  scene: { preload, create, update }
};
let player, cursors, score = 0, scoreText;
function preload() {
  this.load.image('platform', 'https://labs.phaser.io/assets/sprites/platform.png');
  this.load.image('bottle', 'https://labs.phaser.io/assets/sprites/pangball.png');
  this.load.spritesheet('randy', 'https://labs.phaser.io/assets/sprites/dude.png',
    { frameWidth: 32, frameHeight: 48 });
}
function create() {
  const platforms = this.physics.add.staticGroup();
  platforms.create(400, 440, 'platform').setScale(2).refreshBody();
  player = this.physics.add.sprite(100, 300, 'randy');
  player.setCollideWorldBounds(true);
  this.physics.add.collider(player, platforms);
  cursors = this.input.keyboard.createCursorKeys();
  const bottles = this.physics.add.group({ key: 'bottle', repeat: 5, setXY: { x: 150, y: 0, stepX: 120 } });
  this.physics.add.collider(bottles, platforms);
  this.physics.add.overlap(player, bottles, (p, b) => { b.disableBody(true, true); score += 10; scoreText.setText('Score: ' + score); });
  scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '18px', fill: '#fff' });
}
function update() {
  if (cursors.left.isDown) { player.setVelocityX(-160); player.anims.play('left', true); }
  else if (cursors.right.isDown) { player.setVelocityX(160); player.anims.play('right', true); }
  else { player.setVelocityX(0); player.anims.play('turn'); }
  if (cursors.up.isDown && player.body.touching.down) player.setVelocityY(-500);
}
new Phaser.Game(config);
