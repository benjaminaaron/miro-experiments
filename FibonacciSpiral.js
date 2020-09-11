let x = 0;
let y = 0;
let angle = 0;
let radius = 200;
let outwards = 12;
let n = 200;

let goldenRatio = (1 + Math.sqrt(5)) / 2;
let goldenAngle = 2 * Math.PI * (1 - 1 / goldenRatio); // https://en.wikipedia.org/wiki/Golden_angle

for (let i = 0; i < n; i++) {
    x = Math.cos(angle) * radius;
    y = Math.sin(angle) * radius;
    miro.board.widgets.create({type:'sticker', style: {stickerBackgroundColor: '#f0d150'}, text: i, x: x, y: - y})
    angle += goldenAngle;
    radius += outwards;
}
