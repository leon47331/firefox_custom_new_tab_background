browser.browserAction.onClicked.addListener(function(tab) {
  const updating = browser.tabs.update(tab.id, {
    url: "about:newtab"
  });

  updating.then(function() {
    browser.tabs.onUpdated.addListener(function(details) {
      if (details.tab.status === "complete" && details.url === "about:newtab") {
        const bgUrl = "http://screenshot.onelk-server.de/files/RE4LLZQ.jpg";
        const bgStyle = `
          .activity-stream {
            background-image: url(${bgUrl}) !important;
            background-repeat: no-repeat !important;
            background-size: cover !important;
          }
          .activity-stream #top-sites {
            background-color: rgba(255, 255, 255, 0.7) !important;
          }
          .activity-stream #sponsored-content {
            display: none !important;
          }
          #newtab-customize-overlay {
            display: none !important;
          }
        `;
        const style = document.createElement("style");
        style.innerHTML = bgStyle;
        browser.tabs.insertCSS(details.tabId, { code: bgStyle });
      }
    });
  });
});
