async function loadTab(tabName) {
    const contentContainer = document.getElementById('tab-content');

    try {
        const response = await fetch(`tabs/${tabName}.html`);
        if (!response.ok) throw new Error('Tab not found');

        const content = await response.text();
        contentContainer.innerHTML = content;
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
    activeButton.classList.add('active', 'text-palette-darkest', 'border-palette-dark');
    activeButton.classList.remove('text-palette-medium', 'border-transparent');

    loadTab(tabName);
}

document.querySelectorAll('.tab-button').forEach((button) => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        switchTab(tabName);
    });
});

switchTab('tab1');
