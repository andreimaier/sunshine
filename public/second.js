const flexContainer = document.querySelector('.flex-container');
let draggedItem;

// Set up drag event listeners for each flex item
const flexItems = document.querySelectorAll('.flex-item');
flexItems.forEach(item => {
  item.addEventListener('dragstart', handleDragStart);
  item.addEventListener('dragover', handleDragOver);
  item.addEventListener('drop', handleDrop);
});

function handleDragStart(e) {
  // Set the data being dragged to the item's index in the flex container
  e.dataTransfer.setData('text/plain', this.dataset.index);
  draggedItem = this;
}

function handleDragOver(e) {
  e.preventDefault();
  // Add a class to the element being dragged over
  e.currentTarget.classList.add('drag-over');
}

function handleDrop(e) {
  e.preventDefault();
  // Get the index of the item being dropped over
  const targetIndex = parseInt(e.currentTarget.dataset.index);
  // Get the index of the dragged item
  const draggedIndex = parseInt(draggedItem.dataset.index);
  // Remove the drag-over class from the drop target
  e.currentTarget.classList.remove('drag-over');
  // If the dragged item is dropped after the target, increment the target index
  const dropAfter = draggedIndex < targetIndex;
  const newIndex = dropAfter ? targetIndex + 1 : targetIndex;
  // Move the dragged item to the new index in the flex container
  flexContainer.insertBefore(draggedItem, flexItems[newIndex]);
  // Update the index of each flex item to reflect the new order
  flexItems.forEach((item, index) => {
    item.dataset.index = index;
  });
}