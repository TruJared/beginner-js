const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

let items = [];

function mirrorToLocalStorage() {
    localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
    const lsItems = JSON.parse(localStorage.getItem('items'));
    if (lsItems.length) {
        items.push(...lsItems);
    }
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
    const html = items
        .map(
            item => `<li class="shopping-item">
        <input type="checkbox" value="${item.id}" ${item.complete ? 'checked' : ''}>
        <span class="itemName">${item.name}</span>
        <button aria-label="Remove ${item.name}" value="${item.id}">
            &times;
        </button>
    </li>`
        )
        .join('');
    list.innerHTML = html;
}

function handleSubmit(e) {
    e.preventDefault();
    const name = e.currentTarget.item.value;
    if (!name) return;
    const item = { name, id: Date.now(), complete: false };
    items.push(item);
    e.target.reset();
    // * custom event * //
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function markedAsComplete(id) {
    const itemRef = items.find(item => item.id === id);
    itemRef.complete = !itemRef.complete;
}

function deleteItem(id) {
    items = items.filter(item => item.id !== id);
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('click', e => {
    const id = parseInt(e.target.value);
    // event delegation
    if (e.target.matches('button')) {
        deleteItem(id);
    }
    if (e.target.matches('input[type="checkbox"]')) {
        markedAsComplete(id);
    }
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
});
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);
restoreFromLocalStorage();
