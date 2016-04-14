function getRandomInt(min, max) {
    
    var links = ["atom", "sea", "muscle", "pulsator", "nowhere", 
    "glitter", "pixels", "sling"];
   
    // var randomLink = links[Math.floor(Math.random() * (max - min + 1)) + min]
    var randomLink = links[7];

    console.log("link is: " + randomLink);
    window.location.replace("/" + randomLink);

    // -1 with max for call func
}