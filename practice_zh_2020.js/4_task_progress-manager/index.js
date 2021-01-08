const todos = document.querySelector("#todos");


delegate(todos, "click", "li ul li", addClass);

function addClass(event) {
    let target = event.target;

    if (target.className !== "done") {
        target.classList.add("done");
        while (target.previousElementSibling != null && target.previousElementSibling.tagName === "LI") {
            target = target.previousElementSibling;
            target.classList.add("done");
        }

        if (event.target== target.parentNode.lastElementChild) {
            event.target.closest(".step").classList.add("done");
        }
    } else {
        bool = true;
        while (target.nextElementSibling != null && target.nextElementSibling.tagName === "LI" && bool) {
            target = target.nextElementSibling;
            if (target.className === "done") {
                bool = false;
            }
        }
        if (bool) {
            event.target.classList.remove("done");
        }
        event.target.closest(".step").classList.remove("done");
    }

}


function delegate(parent, type, selector, handler) {
    parent.addEventListener(type, function (event) {
        const targetElement = event.target.closest(selector);
        if (this.contains(targetElement)) {
            handler.call(targetElement, event);
        }
    })
}