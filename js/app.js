// Define Global Variables
const navigationBar = document.querySelector("ul"),
    sections = document.querySelectorAll("section"),
    //to decrese reflow and repaint in DOM tree
    fragment = document.createDocumentFragment();

// build the nav
for (let i = 1; i <= sections.length; i++) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.classList.add("menu__link");
    a.setAttribute("href", `#section${i}`);
    a.setAttribute("data-scroll-to-section", `${sections[i - 1].id}`);
    a.innerHTML = `Section ${i}`;
    li.appendChild(a);
    fragment.appendChild(li);
}
// Onetime (reflow & repaint)
navigationBar.appendChild(fragment);

// Add class 'active' to section when near top of viewport
const links = document.querySelectorAll("ul li a");
window.addEventListener("scroll", function () {
    sections.forEach(section => {
        if (section.getBoundingClientRect().top > 0 && section.getBoundingClientRect().top < 250) {
            section.classList.add("your-active-class");
            for (let l = 0; l <= links.length; l++) {
                if (links[l].textContent === section.getAttribute("data-nav")) {
                    links[l].classList.add("activated-link");
                } else {
                    links[l].classList.remove("activated-link");
                }
            }
        } else {
            section.classList.remove("your-active-class");
        }
    });
});

navigationBar.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.dataset.scrollToSection) {
        const link = document.querySelector(`#${e.target.dataset.scrollToSection}`);
        link.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
});

