analytics.on("ready", function() {
    console.log("ready", arguments);
});

analytics.on('page', function (category, event, properties, options) {
    var img = document.createElement("img");
    img.src = "/log?page=" + event;
    document.body.appendChild(img);
    console.log(arguments)
});

analytics.on('track', function (event, properties, options) {
 console.log(event, properties, options);
});
