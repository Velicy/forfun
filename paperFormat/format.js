"use strict";

document.querySelector("#submit").onclick = function() {
    format()
}

document.querySelector("#clear").onclick = function() {
    document.querySelector("#in").value = ""
}


document.querySelector("#copy").onclick = function() {
    var copyText = document.querySelector("#out")
    if (copyText.value==="") {
    	document.querySelector("#msg").innerHTML="没有内容可复制"
    	return
    }
    copyText.select()
    try {
        var successful = document.execCommand('copy')
        var msg = successful ? 'successful' : 'unsuccessful'
        document.querySelector("#msg").innerHTML="复制成功！"
    } catch (err) {
    	document.querySelector("#msg").innerHTML="error:请使用其他方式复制"
    }
}

function format() {
    var input = document.querySelector("#in").value
    var language = document.querySelectorAll(".language")
    if (language[0].checked) {
        document.querySelector("#out").value = chinese(input)
    } else {
        document.querySelector("#out").value = english(input)
    }
}

function chinese(inputs) {
    return inputs.replace(/\s*\n/g, " ").replace(/\s{2,}/g, "\n").replace(/ /g, "")
}

function english(inputs) {
    return inputs.replace(/\n/g, " ").replace(/-\s*/g, "").replace(/\s{2,}/g, "\n")
}
