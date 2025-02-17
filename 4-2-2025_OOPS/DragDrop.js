
        const list = document.getElementById("sortable-list");
        let draggedItem = null;

        list.addEventListener("dragstart", function (e) {
            draggedItem = e.target;
            e.target.classList.add("dragging");
        });

        list.addEventListener("dragover", function (e) {
            e.preventDefault();
            const afterElement = getDragAfterElement(list, e.clientY);
            if (afterElement == null) {
                list.appendChild(draggedItem);
            } else {
                list.insertBefore(draggedItem, afterElement);
            }
        });

        list.addEventListener("dragend", function () {
            draggedItem.classList.remove("dragging");
            draggedItem = null;
        });

        function getDragAfterElement(container, y) {
            const draggableElements = [...container.querySelectorAll(".list-group-item:not(.dragging)")];

            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element;
        }
 