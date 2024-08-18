const modal = document.createElement('div');
modal.style.position = 'fixed';
modal.style.top = '0';
modal.style.left = '0';
modal.style.width = '100vw';
modal.style.height = '100vh';
modal.style.backgroundColor = 'rgba(0, 0, 0, 1)';
modal.style.display = 'flex';
modal.style.alignItems = 'center';
modal.style.justifyContent = 'center';
modal.style.zIndex = '9999';
modal.innerHTML = `
    <div style="color: white; font-size: 24px; text-align: center; width: 500px; background-color: #333; padding: 20px; border-radius: 10px;">
        <h2 style="color: white; font-size: 36px;">Mindful Browsing</h2>
        <p style="color: white; font-size: 24px;">Are you sure you want to visit this site?</p>
        <button id="stay" style="background-color: #4CAF50; color: white; font-size: 24px; padding: 10px 20px; border: none; border-radius: 5px;">Stay Focused</button>
        <button id="continue" style="background-color: #D22B2B; color: black; font-size: 24px; padding: 10px 20px; border: none; border-radius: 5px;">Continue</button>
    </div>
`;

document.body.appendChild(modal);

// Add event listeners for buttons
document.getElementById("stay").onclick = function() {
    window.location.href = "https://www.perplexity.ai/";
    modal.remove(); // Closes the modal
};

document.getElementById("continue").onclick = function() {
    modal.remove(); // Closes the modal
};

