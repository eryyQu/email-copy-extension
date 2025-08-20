// background.js (service worker)
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get({enabled: true}, (data) => {
    if (typeof data.enabled !== "boolean") {
      chrome.storage.local.set({enabled: true});
    }
  });
});

chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "copy-emails") return;
  try {
    const {enabled} = await chrome.storage.local.get({enabled: true});
    if (!enabled) { return; }

    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    if (!tab?.id) return;

    // ask content script on the active tab to extract and copy
    await chrome.tabs.sendMessage(tab.id, {type: "COPY_EMAILS"});
  } catch (e) {
    console.error("Command error:", e);
  }
});
