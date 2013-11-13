
analytics.on('page', function (event, properties, options) {
 console.log(event, properties, options);
 alert("tracked !");
});

analytics.on('track', function (event, properties, options) {
 console.log(event, properties, options);
 alert("tracked !");
});
