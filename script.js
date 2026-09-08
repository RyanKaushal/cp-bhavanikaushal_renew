document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     MOBILE NAVBAR
  ===================================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function (event) {

      event.stopPropagation();

      navLinks.classList.toggle("active");

      const isOpen = navLinks.classList.contains("active");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen
      );

    });


    navLinks.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });


    document.addEventListener("click", function (event) {

      if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {

        navLinks.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    });

  }


  /* =====================================================
     APPOINTMENT FORM VALIDATION
  ===================================================== */

  const appointmentForm =
    document.getElementById("appointmentForm");

  if (appointmentForm) {
  appointmentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const message = document.getElementById("message").value.trim();
    const status = document.getElementById("formStatus");

    if (name === "" || mobile === "" || message === "") {
      status.textContent = "Please fill all required fields.";
      status.style.color = "red";
      return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      status.textContent = "Please enter a valid 10-digit mobile number.";
      status.style.color = "red";
      return;
    }

    const whatsappNumber = "917217756635";

    const whatsappMessage =
      `New Query from Website\n\n` +
      `Name: ${name}\n` +
      `Mobile: ${mobile}\n\n` +
      `Query:\n${message}`;

    const whatsappURL =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappURL, "_blank");

    status.textContent = "Opening WhatsApp...";
    status.style.color = "green";

    this.reset();
  });
}


  /* =====================================================
     VIDEO AUTOPLAY WHEN VISIBLE
  ===================================================== */

  const video =
    document.getElementById("parentingVideo");

  if (video && "IntersectionObserver" in window) {

    const videoObserver =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              video.play().catch(function () {
                /* Autoplay can be blocked by browser */
              });

            } else {

              video.pause();

            }

          });

        },
        {
          threshold: 0.5
        }
      );

    videoObserver.observe(video);

  }


  /* =====================================================
     SERVICE MODAL
  ===================================================== */

  const serviceItems =
    document.querySelectorAll(".service-item");


  serviceItems.forEach(function (item) {

    const button =
      item.querySelector(".learn-more-btn");

    const article =
      item.querySelector(".service-article");


    if (!button || !article) {
      return;
    }


    button.addEventListener(
      "click",
      function () {

        const modal =
          document.createElement("div");

        modal.className = "modal active";


        const modalContent =
          document.createElement("div");

        modalContent.className = "modal-content";


        const closeButton =
          document.createElement("button");

        closeButton.className = "close-btn";

        closeButton.type = "button";

        closeButton.innerHTML = "&times;";


        const modalBody =
          document.createElement("div");

        modalBody.className = "modal-body";

        modalBody.innerHTML =
          article.innerHTML;


        modalContent.appendChild(closeButton);

        modalContent.appendChild(modalBody);

        modal.appendChild(modalContent);

        document.body.appendChild(modal);

        document.body.style.overflow = "hidden";


        function closeModal() {

          modal.remove();

          document.body.style.overflow = "";

        }


        closeButton.addEventListener(
          "click",
          closeModal
        );


        modal.addEventListener(
          "click",
          function (event) {

            if (event.target === modal) {
              closeModal();
            }

          }
        );


        document.addEventListener(
          "keydown",
          function escapeHandler(event) {

            if (event.key === "Escape") {

              closeModal();

              document.removeEventListener(
                "keydown",
                escapeHandler
              );

            }

          }
        );

      }
    );

  });


  /* =====================================================
     FAQ ACCORDION
  ===================================================== */

  const faqItems =
    document.querySelectorAll(".faq-item");


  faqItems.forEach(function (item) {

    const question =
      item.querySelector(".faq-question");

    const icon =
      question.querySelector("i");


    question.addEventListener(
      "click",
      function () {

        const isActive =
          item.classList.contains("active");


        faqItems.forEach(function (faqItem) {

          faqItem.classList.remove("active");

          const faqIcon =
            faqItem.querySelector(
              ".faq-question i"
            );

          if (faqIcon) {

            faqIcon.classList.remove(
              "fa-minus"
            );

            faqIcon.classList.add(
              "fa-plus"
            );

          }

        });


        if (!isActive) {

          item.classList.add("active");

          icon.classList.remove("fa-plus");

          icon.classList.add("fa-minus");

        }

      }
    );

  });

});
