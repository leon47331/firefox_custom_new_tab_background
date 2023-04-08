document.addEventListener("DOMContentLoaded", function(event) {
  var backgroundInput = document.getElementById("backgroundInput");
  var applyButton = document.getElementById("applyButton");

  applyButton.addEventListener("click", function() {
    var file = backgroundInput.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function() {
        var dataUrl = reader.result;
        var image = new Image();
        image.src = dataUrl;
        image.onload = function() {
          var canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          var context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, image.width, image.height);
          var dataUrl = canvas.toDataURL();
          var blob = dataURItoBlob(dataUrl);
          saveBlob(blob, "wallpaper.jpg");
          browser.storage.local.set({ "customBackground": dataUrl });
          browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {type: "applyBackground"});
          });
        };
      };
      reader.readAsDataURL(file);
    }
  });

  function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(",")[1]);
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i
