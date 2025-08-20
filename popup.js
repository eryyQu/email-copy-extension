// popup.js
const checkbox = document.getElementById('enabled');
const status = document.getElementById('status');

function refresh() {
  chrome.storage.local.get({enabled: true}, ({enabled}) => {
    checkbox.checked = !!enabled;
    status.textContent = enabled ? "Działanie: Włączone" : "Działanie: Wyłączone";
  });
}

checkbox.addEventListener('change', () => {
  chrome.storage.local.set({enabled: checkbox.checked}, refresh);
});

document.addEventListener('DOMContentLoaded', refresh);
