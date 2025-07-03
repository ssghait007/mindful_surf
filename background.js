// Mindful Browsing Background Script
console.log('Mindful Browsing: Background script loaded');

// Listen for messages from content scripts (for future features like statistics)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "logBlock") {
        // Future: Could log blocked attempts for statistics
        console.log('Mindful Browsing: Blocked addictive content:', request.data);
    }

    // Always send a response to avoid errors
    sendResponse({success: true});
});

// Extension installation/update handler
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('Mindful Browsing: Extension installed - protecting user from addictive content');
    } else if (details.reason === 'update') {
        console.log('Mindful Browsing: Extension updated to version', chrome.runtime.getManifest().version);
    }
});
