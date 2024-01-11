document.addEventListener("DOMContentLoaded", function () {
    var navigation = document.querySelector(".navigation");
    var sections = document.querySelectorAll("section");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 0) {
            navigation.classList.add("scrolled");
        } else {
            navigation.classList.remove("scrolled");
        }

        sections.forEach(function (section) {
            var sectionTop = section.offsetTop - navigation.offsetHeight;
            var sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                var id = section.getAttribute("id");
                var activeLink = document.querySelector('.navigation a[href="#' + id + '"]');

                document.querySelectorAll('.navigation .link').forEach(function (link) {
                    link.classList.remove('active');
                });

                activeLink.classList.add('active');
            }
        });
    });

    document.querySelectorAll('.navigation .link').forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            var targetId = this.getAttribute('href').substring(1);
            var targetSection = document.getElementById(targetId);

            if (targetSection) {
                console.log("Target ID:", targetId);
                console.log("Target Section:", targetSection);

                var offset = 0;

                if (targetId === 'home') {
                    offset = -navigation.offsetHeight + 1;
                } else if (targetId === 'location') {
                    offset = navigation.offsetHeight - 1;
                }

                window.scrollTo({
                    top: targetSection.offsetTop + offset,
                    behavior: 'smooth'
                });

                document.querySelectorAll('.navigation .link').forEach(function (navLink) {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            } else {
                console.log("Target Section not found!");
            }
        });
    });

    console.log(email);

    var form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (email === "") {
            alert("Veuillez vous connecter pour soumettre le formulaire.");
        } else {
            // Submit the form
            form.submit();
        }
    });
});
