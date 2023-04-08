function getWallpaper(callback) {
  chrome.storage.local.get(['wallpaper'], function(result) {
    if (result.wallpaper) {
      callback(result.wallpaper);
    } else {
      chrome.runtime.getPackageDirectoryEntry(function(root) {
        root.getFile("wallpaper.jpg", {}, function(fileEntry) {
          fileEntry.file(function(file) {
            var reader = new FileReader();
            reader.onloadend = function() {
              var dataURL = reader.result;
              chrome.storage.local.set({ 'wallpaper': dataURL }, function() {
                callback(dataURL);
              });
            };
            reader.readAsDataURL(file);
          });
        });
      });
    }
  });
}

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    title: "Set Wallpaper",
    contexts: ["page", "selection", "image", "link"],
    onclick: function(info, tab) {
      setWallpaper(info.srcUrl);
    }
  });
});

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(tab.id, {
    file: "popup.js"
  });
});

function setWallpaper(url) {
  chrome.downloads.download({ url: url, filename: "wallpaper.jpg" }, function() {
    var file = new Blob([url], {type: "text/plain"});
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
      var dataURL = reader.result;
      chrome.storage.local.set({ 'wallpaper': dataURL }, function() {
        console.log('Wallpaper set');
        document.getElementById('status').textContent = 'Wallpaper set!';
      });
    }
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type == "getWallpaper") {
    getWallpaper(function(wallpaper) {
      sendResponse({ wallpaper: wallpaper });
    });
    return true;
  }
});
