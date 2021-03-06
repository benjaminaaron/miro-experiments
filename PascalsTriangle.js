// https://developers.miro.com/docs/how-to-start

let width = 199;
let height = 228;
let xStart = 0;
let yStart = 0;
//allowed colors: https://developers.miro.com/reference#sticker
let red = '#f16c7f';
let yellow = '#fff9b1';
let orange = '#ff9d48';
let blue = '#23bfe7';

let stickers = [];
let lastStickersInRow = [];

const addSticker = options => {
    stickers.push(options);
    return options;
}

let rows = [[addSticker({row: 0, val: 1, x: xStart, y: yStart})]];

async function generateRowsFromTo(from, to, showOneByOne) {
    for (let i = from; i <= to; i++) {
        xStart -= 0.75 * width;
        yStart -= 1.25 * height;
        let x = xStart;
        let previousRow = rows[i - 1];
        let newRow = [addSticker({row: i, val: 1, x: xStart, y: yStart})];
        for(let j = 0; j < previousRow.length - 1; j++) {
            let val = previousRow[j].val + previousRow[j + 1].val;
            x += 1.5 * width;
            newRow.push(addSticker({row: i, val: val, x: x, y: yStart}));
        }
        let lastStickerInRow = addSticker({row: i, val: 1, x: x + 1.5 * width, y: yStart});
        newRow.push(lastStickerInRow);
        lastStickersInRow.push(lastStickerInRow);
        rows.push(newRow);
    }
    //stickers = [].concat.apply([], rows);

    for (let i = 0; i < stickers.length; i++) {
        let sticker = stickers[i];
        if (sticker.row !== 0 && sticker.row < from) {
            continue;
        }
        let stickerOptions = {type:'sticker', style: {stickerBackgroundColor: yellow}, text: sticker.val, x: sticker.x, y: - sticker.y};
        if (showOneByOne) {
            let stickerObj = (await miro.board.widgets.create(stickerOptions))[0];
            sticker.id = stickerObj.id;
        } else {
            miro.board.widgets.create(stickerOptions).then(stickerObjArr => {
                sticker.id = stickerObjArr[0].id;
            });
        }
    }
}

generateRowsFromTo(1, 8, true);
// ---- COPY-PASTE #1 until here

// ---- COPY-PASTE #2 this line
generateRowsFromTo(9, 32, false);

// COPY-PASTE #3 from here: color odd stickers to reveal Sierpiński triangle
for (let i = 0; i < stickers.length; i++) {
    let sticker = stickers[i];
    if (sticker.val % 2 === 1) {
        miro.board.widgets.update({id: sticker.id, text: sticker.val.toString(), style: {stickerBackgroundColor: blue}, x: sticker.x, y: - sticker.y })
    }
}

// COPY-PASTE #4 from here: show total sum of subgroups next to the respective row
for (let i = 0; i < lastStickersInRow.length; i++) {
    let sticker = lastStickersInRow[i];
    let stickerOptions = {type:'sticker', style: {stickerBackgroundColor: red}, text: Math.pow(2, (i + 1)), x: sticker.x + 1.5 * width, y: - sticker.y};
    await miro.board.widgets.create(stickerOptions)
}

// TODO tag stickers with group size

// await miro.board.widgets.get()
// await miro.board.tags.get()

// https://github.com/YashBhalodi/cardsy/blob/18f76af43303eff6089b4d6b78f79f91cddb7e5b/main.js#L161
// await miro.board.tags.update({
//     id: "", // tagId
//     widgetIds: [] // stickers tagged with this tag
// });
