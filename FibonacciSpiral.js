let x = 0;
let y = 0;
let angle = 0;
let radius = 200;
let outwards = 12;
let n = 500;

let goldenRatio = (1 + Math.sqrt(5)) / 2;
let goldenAngle = 2 * Math.PI * (1 - 1 / goldenRatio); // https://en.wikipedia.org/wiki/Golden_angle

getGradientColor = (start_color, end_color, percent) => { // from https://stackoverflow.com/a/27709336
    start_color = start_color.replace(/^\s*#|\s*$/g, '');
    end_color = end_color.replace(/^\s*#|\s*$/g, '');

    if (start_color.length === 3){
        start_color = start_color.replace(/(.)/g, '$1$1');
    }

    if (end_color.length === 3){
        end_color = end_color.replace(/(.)/g, '$1$1');
    }

    let start_red = parseInt(start_color.substr(0, 2), 16),
        start_green = parseInt(start_color.substr(2, 2), 16),
        start_blue = parseInt(start_color.substr(4, 2), 16);
    let end_red = parseInt(end_color.substr(0, 2), 16),
        end_green = parseInt(end_color.substr(2, 2), 16),
        end_blue = parseInt(end_color.substr(4, 2), 16);

    let diff_red = end_red - start_red;
    let diff_green = end_green - start_green;
    let diff_blue = end_blue - start_blue;

    diff_red = ( (diff_red * percent) + start_red ).toString(16).split('.')[0];
    diff_green = ( (diff_green * percent) + start_green ).toString(16).split('.')[0];
    diff_blue = ( (diff_blue * percent) + start_blue ).toString(16).split('.')[0];

    if( diff_red.length === 1 ) diff_red = '0' + diff_red
    if( diff_green.length === 1 ) diff_green = '0' + diff_green
    if( diff_blue.length === 1 ) diff_blue = '0' + diff_blue

    return '#' + diff_red + diff_green + diff_blue;
};

for (let i = 0; i < n; i++) {
    x = Math.cos(angle) * radius;
    y = Math.sin(angle) * radius;
    await miro.board.widgets.create({type:'sticker', style: {stickerBackgroundColor: getGradientColor('#fff9b2', '#7f94f8', i * (1 / (n - 1)))}, text: i, x: x, y: - y})
    angle += goldenAngle;
    radius += outwards;
}
