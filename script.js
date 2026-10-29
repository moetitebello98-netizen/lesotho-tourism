
document.addEventListener("DOMContentLoaded", function () {
  
  document.querySelectorAll(".current-year").forEach(function (item) {
    item.textContent = new Date().getFullYear();
  });

  
  const form = document.getElementById("registrationForm");
  if (form) {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const message = document.getElementById("formMessage");

    function checkPasswords() {
      if (confirmPassword.value !== password.value) {
        confirmPassword.setCustomValidity("Passwords do not match");
      } else {
        confirmPassword.setCustomValidity("");
      }
    }

    password.addEventListener("input", checkPasswords);
    confirmPassword.addEventListener("input", checkPasswords);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      checkPasswords();
      form.classList.add("was-validated");

      if (!form.checkValidity()) {
        message.className = "mt-3 alert alert-danger";
        message.textContent = "Please check the highlighted fields and correct the errors.";
        return;
      }

      message.className = "mt-3 alert alert-success";
      message.textContent = "Thank you, " + document.getElementById("fullName").value.trim() +
        "! The demo form has been validated successfully. No information was sent to a server.";
      form.reset();
      form.classList.remove("was-validated");
      confirmPassword.setCustomValidity("");
    });
  }

  
  const photoButtons = Array.from(document.querySelectorAll(".gallery-thumb"));
  const photoModalElement = document.getElementById("photoModal");
  if (photoButtons.length && photoModalElement && window.bootstrap) {
    const photoModal = new bootstrap.Modal(photoModalElement);
    const modalPhoto = document.getElementById("modalPhoto");
    const modalCaption = document.getElementById("modalCaption");
    const modalTitle = document.getElementById("photoModalLabel");
    let selectedPhoto = 0;

    function showPhoto(index) {
      selectedPhoto = (index + photoButtons.length) % photoButtons.length;
      const button = photoButtons[selectedPhoto];
      const imageUrl = button.getAttribute("data-image");
      const caption = button.getAttribute("data-caption");
      modalPhoto.src = imageUrl;
      modalPhoto.alt = caption;
      modalCaption.textContent = caption;
      modalTitle.textContent = caption;
    }

    photoButtons.forEach(function (button, index) {
      button.addEventListener("click", function () {
        showPhoto(index);
        photoModal.show();
      });
    });

    document.getElementById("previousPhoto").addEventListener("click", function () {
      showPhoto(selectedPhoto - 1);
    });
    document.getElementById("nextPhoto").addEventListener("click", function () {
      showPhoto(selectedPhoto + 1);
    });
  }
});
