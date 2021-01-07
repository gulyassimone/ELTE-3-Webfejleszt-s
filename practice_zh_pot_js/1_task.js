let toc = document.querySelector("#toc");
const button = document.querySelector("button");
const header = document.querySelectorAll("h1,h2,h3");

button.addEventListener("click", function (event) {
    if (toc == null) {
        toc = document.createElement('div');
        toc.setAttribute("id", "toc");
        const h1Lu = document.createElement('ul');

        header.forEach(function (elem) {
            if (elem.tagName == "H1") {
                const h1Li = document.createElement('li');
                h1Li.innerHTML = elem.innerText;
                h1Lu.appendChild(h1Li);
            } else if (elem.tagName == "H2") {
                const h2Li = document.createElement('li');
                h2Li.innerHTML = elem.innerText;

                if (!(h1Lu.lastChild.closest("ul ul "))) {
                    const h2Lu = document.createElement('ul');
                    h2Lu.appendChild(h2Li);
                    h1Lu.lastChild.closest("ul").appendChild(h2Lu);
                }else{
                    h1Lu.lastChild.closest("ul").appendChild(h2Li);
                }
            } else if (elem.tagName == "H3") {
                const h3Li = document.createElement('li');
                h3Li.innerHTML = elem.innerText;

                if (!(h1Lu.lastChild.lastChild.closest("ul ul ul"))) {
                    const h3Lu = document.createElement('ul');
                    h3Lu.appendChild(h3Li);
                    h1Lu.lastChild.closest("ul").appendChild(h3Lu);
                }else{
                    h1Lu.lastChild.lastChild.closest("ul").appendChild(h3Li);
                }
            }
            
        });
        toc.appendChild(h1Lu);
        document.querySelector('body').insertBefore(toc, button);
    }
})

