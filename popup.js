document.addEventListener("DOMContentLoaded", function () {
  // Set the current wallpaper image
  getWallpaper(function (url) {
    document.body.style.backgroundImage = "url('" + url + "')";
  });

  // Add click event listener to the "Apply" button
  document.getElementById("applyButton").addEventListener("click", function () {
    var url = document.getElementById("imageInput").value;
    setWallpaper(url);
  });
});

function setWallpaper(url) {
  chrome.downloads.download({ url: url, filename: "wallpaper.jpg" }, function () {
    var file = new Blob([url], { type: "text/plain" });
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      var dataURL = reader.result;
      browser.storage.local.set({ 'wallpaper': dataURL }, function () {
        console.log('Wallpaper set');
        document.getElementById('status').textContent = 'Wallpaper set!';
      });
    }
  });
}

function getWallpaper(callback) {
  browser.storage.local.get(['wallpaper'], function (result) {
    if (result.wallpaper) {
      callback(result.wallpaper);
    } else {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', browser.runtime.getURL('wallpaper.jpg'), true);
      xhr.responseType = 'blob';
      xhr.onload = function () {
        var reader = new FileReader();
        reader.readAsDataURL(xhr.response);
        reader.onload = function (e) {
          var dataURL = reader.result;
          browser.storage.local.set({ 'wallpaper': dataURL }, function () {
            callback(dataURL);
          });
        }
      };
      xhr.send();
    }
  });
}
