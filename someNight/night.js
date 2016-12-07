"use strict"

var words = document.querySelector("#hide").innerHTML
var index = 0
var width = document.body.scrollWidth;
var height = document.body.scrollHeight;

function showMsg() {
    var intervalId = setInterval(function() {
        document.querySelector("#show").innerHTML = words.substring(0, index++)
        console.log(index)
        if (index > words.length)
            clearInterval(intervalId)
    }, 200)
}

function controlAudio() {
    var kflag = 0
    document.querySelector("html").addEventListener("keydown", function(event) {
        if (event.keyCode === 32) {
            console.log("hi")
            if (kflag) {
                document.querySelector("audio").pause()
                kflag = 0
            } else {
                document.querySelector("audio").play()
                kflag = 1
            }
        }
    })
}

function showMoon() {
    document.querySelector("#moon").style.visibility = "visible"
}

function createStars() {
    for (var i = 0; i < 99; i++) {
        var temp = document.createElement("div")
        temp.className = "star"
        temp.style.width = temp.style.height = Math.floor(Math.random() * 5) + "px"
        temp.style.top = Math.floor(Math.random() * height) + "px"
        temp.style.right = Math.floor(Math.random() * width) + "px"
        console.log(height)
        console.log(temp.style.right)
        temp.style.animation = "shine " + Math.floor(Math.random() * 10) + "s linear " + Math.random() * 30 + "s infinite"
        document.querySelector(".container").appendChild(temp)
    }
}

window.onload = function() {
    showMsg()
    controlAudio()
    setTimeout(showMoon, 10000)
    setTimeout(createStars, 20000)

}
