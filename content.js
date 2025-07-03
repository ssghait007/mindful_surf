// Mindful Browsing - Block addictive actions
console.log('Mindful Browsing: Content script loaded');

// Function to check if current URL is a YouTube short
function isYouTubeShort(url) {
    return url.includes('/shorts/');
}

// Function to check if current URL is an Instagram reel
function isInstagramReel(url) {
    return url.includes('instagram.com') && (url.includes('/reels/') || url.includes('/stories/') || url.includes('/explore/'));
}

// Function to check if current URL is addictive content
function isAddictiveContent(url) {
    return isYouTubeShort(url) || isInstagramReel(url);
}

// Function to go back and increment counter
function goBack(contentType = 'content') {
    console.log(`Mindful Browsing: Blocking ${contentType}, going back`);

    // Increment today's counter
    const today = new Date().toDateString();
    chrome.storage.local.get([today], function(result) {
        const count = (result[today] || 0) + 1;
        chrome.storage.local.set({[today]: count});
    });

    window.history.back();
}

// Check URL on page load
if (isAddictiveContent(window.location.href)) {
    console.log('Mindful Browsing: Addictive content detected on load, going back');
    goBack();
}

// Monitor URL changes (for single-page app navigation)
let currentUrl = window.location.href;

// Use MutationObserver to detect URL changes in SPA navigation
const observer = new MutationObserver(() => {
    if (currentUrl !== window.location.href) {
        currentUrl = window.location.href;
        console.log('Mindful Browsing: URL changed to:', currentUrl);

        if (isAddictiveContent(currentUrl)) {
            const contentType = isYouTubeShort(currentUrl) ? 'YouTube short' : 'Instagram reel';
            console.log(`Mindful Browsing: ${contentType} detected, going back`);
            setTimeout(() => goBack(contentType), 100); // Small delay to ensure page has started loading
        }
    }
});

// Start observing when DOM is ready
function startObserving() {
    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    } else {
        // Wait for DOM to be ready
        setTimeout(startObserving, 100);
    }
}

startObserving();

// Also listen for popstate events (back/forward navigation)
window.addEventListener('popstate', () => {
    setTimeout(() => {
        if (isAddictiveContent(window.location.href)) {
            const contentType = isYouTubeShort(window.location.href) ? 'YouTube short' : 'Instagram reel';
            console.log(`Mindful Browsing: ${contentType} detected via popstate, going back`);
            goBack(contentType);
        }
    }, 100);
});

// Listen for pushstate/replacestate (SPA navigation)
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

history.pushState = function() {
    originalPushState.apply(history, arguments);
    setTimeout(() => {
        if (isAddictiveContent(window.location.href)) {
            const contentType = isYouTubeShort(window.location.href) ? 'YouTube short' : 'Instagram reel';
            console.log(`Mindful Browsing: ${contentType} detected via pushState, going back`);
            goBack(contentType);
        }
    }, 100);
};

history.replaceState = function() {
    originalReplaceState.apply(history, arguments);
    setTimeout(() => {
        if (isAddictiveContent(window.location.href)) {
            const contentType = isYouTubeShort(window.location.href) ? 'YouTube short' : 'Instagram reel';
            console.log(`Mindful Browsing: ${contentType} detected via replaceState, going back`);
            goBack(contentType);
        }
    }, 100);
};
