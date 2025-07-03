// Mindful Browsing Popup - Display blocked count
document.addEventListener('DOMContentLoaded', function() {
    // Get today's date as key
    const today = new Date().toDateString();

    // Load blocked count from storage
    chrome.storage.local.get([today], function(result) {
        const count = result[today] || 0;
        document.getElementById('blockedCount').textContent = count;
    });
});
