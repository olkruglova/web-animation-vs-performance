async function loadTab(tabName) {
    const contentContainer = document.getElementById('tab-content');

    try {
        const response = await fetch(`tabs/${tabName}.html`);
        if (!response.ok) throw new Error('Tab not found');

        const content = await response.text();
        contentContainer.innerHTML = content;

        // Initialize canvas tab after content is loaded
        if (tabName === 'tab5') {
            // Give the DOM a moment to update
            setTimeout(() => {
                if (typeof drawInitialState === 'function') {
                    drawInitialState();
                }
            }, 100);
        }
    } catch (error) {
        contentContainer.innerHTML = `
            <div class="text-center py-12">
                <div class="inline-block p-4 bg-red-50 rounded-lg border border-red-200">
                    <p class="text-red-600 font-semibold">Error loading tab content</p>
                    <p class="text-red-500 text-sm mt-2">${error.message}</p>
                </div>
            </div>
         `;
    }
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-button').forEach((button) => {
        button.classList.remove('active', 'text-palette-darkest', 'border-palette-dark');
        button.classList.add('text-palette-medium', 'border-transparent');
    });

    const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeButton) {
        activeButton.classList.add('active', 'text-palette-darkest', 'border-palette-dark');
        activeButton.classList.remove('text-palette-medium', 'border-transparent');
    }

    loadTab(tabName);

    // Update URL without page reload
    const url = new URL(window.location);
    url.searchParams.set('tab', tabName);
    window.history.pushState({ tab: tabName }, '', url);
}

// Handle browser back/forward buttons
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.tab) {
        switchTab(event.state.tab);
    } else {
        // If no state, check URL params
        const urlParams = new URLSearchParams(window.location.search);
        const tab = urlParams.get('tab') || 'tab1';
        switchTab(tab);
    }
});

// Add click handlers to tab buttons
document.querySelectorAll('.tab-button').forEach((button) => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        switchTab(tabName);
    });
});

function initializeFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab') || 'tab1';

    window.history.replaceState({ tab: tab }, '', window.location.href);

    switchTab(tab);
}

initializeFromURL();
