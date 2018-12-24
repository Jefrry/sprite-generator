var canvas     = document.getElementById('myCanvas');
var ctx        = canvas.getContext("2d");
var saveBtn    = document.getElementById('saveBtn');
var setPicsBtn = document.getElementById('setPicsBtn');
var title      = document.getElementById('title');

saveBtn.addEventListener('click', save, false);
setPicsBtn.addEventListener('click', setPics, false);

function setPics () {
    var pics            = [],
        x               = 0,
        y               = 0,
        widthOfPics     = parseInt(document.getElementById('widthOfPics').value, 10),
        heightOfPics    = parseInt(document.getElementById('heightOfPics').value, 10),
        rowOfPics       = parseInt(document.getElementById('rowOfPics').value, 10),
        columnOfPics    = parseInt(document.getElementById('columnOfPics').value, 10);
        canvas.width    = columnOfPics * widthOfPics;
        canvas.height   = rowOfPics * heightOfPics;
        title.innerHTML = 'DO IT',
        input           = document.getElementById('inputFiles').files;

    for (var i = 0; i < input.length; i++) {
        pics.push({
            src: URL.createObjectURL(input[i]),
            x: +x,
            y: +y
        });
        if (x == columnOfPics*widthOfPics-widthOfPics) {
            x = 0;
            y += heightOfPics;
        } else {
            x += widthOfPics;
        }
    }
    render(pics);
}
function render (pics) {
    var i = 0;
    pics.sort();
    var inter = setInterval(function () {
        var el         = pics[i];
        base_image     = new Image();
        base_image.src = el.src;
        base_image.onload = function () {
            ctx.drawImage(base_image, el.x, el.y);
        }
        if (i == pics.length-1) {
            clearInterval(inter);
            title.innerHTML = 'Done!';
        }
        i++
    }, 1000);
}
function save () {
    var d = canvas.toDataURL("image/png");
    var w = window.open('about:blank', 'image from canvas');
    w.document.write("<img src='" + d + "' alt='from canvas'/>");
}