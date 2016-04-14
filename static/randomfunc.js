function getRandomInt(min, max) {
    // return Math.floor(Math.random() * (max - min + 1)) + min;
    
    var links = ["atom", "sea", "muscle", "pulsator", "nowhere"];
    // var el = document.getElementById('foo');
	// el.onclick = showFoo;
    // $.get("http://localhost:3000/" + links[Math.floor(Math.random() * (max - min + 1)) + min]);
    // return "http://google.com"
    // return ="location.href='http://google.com';"
    // window.location.replace("http://localhost:3000/" + links[Math.floor(Math.random() * (max - min + 1)) + min]);

    var randomLink = links[Math.floor(Math.random() * (max - min + 1)) + min]
    window.location.replace("/" + randomLink);
}