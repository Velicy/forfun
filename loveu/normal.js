"use strict";

var content = [
    "力微任重久神疲，",
    "再竭衰庸定不支。",
    "苟利国家生死以，",
    "岂因祸福避趋之？",
    "谪居正是君恩厚，",
    "养拙刚于戍卒宜。",
    "戏与山妻谈故事，",
    "试吟断送老头皮。",
    "",
    "......",
    "",
    "是不是职业病又犯了想偷看我代码o(￣ヘ￣o＃)",
    "N",
    "A",
    "I",
    "V",
    "E",
    "!"
];

var workplace = document.querySelector("#workplace");
var i = 0

function show() {
    var para = document.createElement("p");
    var para_text = document.createTextNode(content[i]);
    para.appendChild(para_text);
    workplace.appendChild(para);
    i++;
}

function check() {
    if (i === content.length) {
        clearInterval(intervalID);
    }
}

var intervalID = setInterval(function(event) {
    show();
    check();
}, 1500);
