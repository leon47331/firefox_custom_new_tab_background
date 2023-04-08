// Get the saved background URL from local storage
chrome.storage.local.get("bgUrl", function(result) {
  document.getElementById("bgUrl").value = result.bgUrl || "";
});

// Save the background URL to local storage
document.getElementById("saveBtn").addEventListener("click", function() {
  const bgUrl = document.getElementById("bgUrl").value;
  chrome.storage.local.set({bgUrl});
});
