async function loadTab(tabName) {
    const contentContainer = document.getElementById('tab-content');

    try {
        const response = await fetch(`tabs/${tabName}.html`);
        if (!response.ok) throw new Error('Tab not found');

        const content = await response.text();
        contentContainer.innerHTML = content;
    } catch (error) {
        contentContainer.innerHTML = `
            <div class="text-red-500 font-semibold">
                Error loading tab content: ${error.message}
            </div>
        `;
    }
}

// Handle tab switching
function switchTab(tabName) {
    // Update active button styling
    document.querySelectorAll('.tab-button').forEach((button) => {
        button.classList.remove('active', 'text-blue-600', 'border-b-2', 'border-blue-600');
        button.classList.add('text-gray-600');
    });

    const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
    activeButton.classList.add('active', 'text-blue-600', 'border-b-2', 'border-blue-600');
    activeButton.classList.remove('text-gray-600');

    // Load the tab content
    loadTab(tabName);
}

// Add click event listeners to all tab buttons
document.querySelectorAll('.tab-button').forEach((button) => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        switchTab(tabName);
    });
});

// Load the first tab by default
switchTab('tab1');
