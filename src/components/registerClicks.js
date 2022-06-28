export function printCoordinates(event) {
    var divHeight = parseFloat(document.getElementById('PhotoBody').offsetHeight); 
    console.log("width: " + window.innerWidth)
    console.log("height: " + divHeight)
    console.log(`client = (${event.clientX / window.innerWidth}, ${event.clientY / divHeight})`)
    console.log(`screen = (${event.screenX / window.innerWidth}, ${event.screenY / divHeight})`)
    console.log(`offset = (${event.offsetX / window.innerWidth}, ${event.offsetY / divHeight})`)

}