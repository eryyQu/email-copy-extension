// content.js
(function() {
  function extractEmails(text) {
    // Robust RFC5322-ish but pragmatic regex
    const re = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const found = text.match(re) || [];
    // keep order of appearance, remove duplicates while preserving order
    const seen = new Set();
    const orderedUnique = [];
    for (const m of found) {
      const lower = m.toLowerCase();
      if (!seen.has(lower)) {
        seen.add(lower);
        orderedUnique.push(m);
      }
    }
    return orderedUnique;
  }

  async function copyToClipboard(text) {
    // Try async clipboard API first
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      // Fallback to execCommand
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok;
      } catch (e2) {
        return false;
      }
    }
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.top = '16px';
    toast.style.right = '16px';
    toast.style.zIndex = 2147483647;
    toast.style.padding = '10px 14px';
    toast.style.borderRadius = '12px';
    toast.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
    toast.style.background = 'white';
    toast.style.color = 'black';
    toast.style.fontFamily = 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif';
    toast.style.fontSize = '14px';
    toast.style.maxWidth = '60vw';
    toast.style.wordBreak = 'break-word';
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'opacity .25s ease, transform .25s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-6px)';
    }, 1500);
    setTimeout(() => {
      toast.remove();
    }, 2000);
  }

  async function handleCopy() {
    const sel = window.getSelection ? String(window.getSelection()) : "";
    const emails = extractEmails(sel);
    if (emails.length === 0) {
      showToast("Nie znaleziono adresów e‑mail w zaznaczeniu.");
      return;
    }
    // format: "a@a.pl; b@b.pl; c@c.pl;"
    const formatted = emails.map(e => `${e};`).join(' ');
    const ok = await copyToClipboard(formatted);
    if (ok) {
      showToast(`Skopiowano ${emails.length} ${emails.length === 1 ? "adres" : "adresy"} e‑mail.`);
    } else {
      showToast("Nie udało się skopiować do schowka.");
    }
  }

  chrome.runtime.onMessage.addListener((msg, _sender, _sendResponse) => {
    if (msg?.type === "COPY_EMAILS") {
      handleCopy();
    }
  });
})();
