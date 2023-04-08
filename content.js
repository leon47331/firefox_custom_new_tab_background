document.addEventListener("DOMContentLoaded", function() {
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
  document.body.appendChild(style);
});
