// Show, hide ticket modal
function ticketModal() {
  const buyBtns = document.querySelectorAll(".js-buy-btn");
  const ticketModal = document.querySelector(".js-ticket-modal");
  const ticketModalClose = document.querySelector(".js-ticket-modal-close");
  const ticketModalContent = document.querySelector(".js-ticket-modal-content");

  // function show/hide ticket-modal
  function showTicketModal() {
    ticketModal.classList.add("show");
  }

  function hideTicketModal() {
    ticketModal.classList.remove("show");
  }

  // for loop add eventListener for each btn
  for (const buyBtn of buyBtns) {
    buyBtn.addEventListener("click", showTicketModal);
  }

  // listen for 'click' on close-btn
  ticketModalClose.addEventListener("click", hideTicketModal);

  // listen for 'click' on ticket-modal
  //  => to close ticket-modal when click outside ticket-modal-content
  ticketModal.addEventListener("click", (e) => {
    if (e.target !== e.currentTarget) {
      return;
    } else {
      hideTicketModal();
    }
  });

  // Prevent 'click event' from ticket-modal-content (do not close ticket-modal when click on ticket-modal-content)
  //  => to close ticket-modal when click outside ticket-modal-content
  // ticketModalContent.addEventListener("click", function (event) {
  //   event.stopPropagation();
  // });
}

// =========>>>>>>> Click Show/hide menu + subMenu <<<<<======
function sMenuControl() {
  // query s-menu-btn, header height
  var sMenuBtn = document.querySelector(".js-s-menu-btn");
  var header = document.querySelector(".js-header");
  var headerOriginHeight = header.offsetHeight;
  // query s-menu-icon
  var sMenuIcon = document.querySelector(".js-s-menu-icon");
  // query menu-modal on mobile
  var sMenuModal = document.querySelector(".js-s-menu-modal");

  // when user click on menu icon
  sMenuBtn.onclick = function () {
    var headerCurrentHeight = header.offsetHeight;
    // if menu is off
    if (headerCurrentHeight == headerOriginHeight) {
      // throwing menu
      header.style.maxHeight = "450px";
      // rotating menu icon
      sMenuIcon.style.transform = "rotate(90deg)";
      // show s-menu-modal
      sMenuModal.style.display = "block";
    } else {
      // hiding menu
      header.style.maxHeight = headerOriginHeight + "px";
      // rotating menu icon back to normal
      sMenuIcon.style.transform = "rotate(0deg)";
      // hiding menu-modal
      sMenuModal.style.display = "none";
    }
  };

  // click on sMenuModal -> hide modal, hide menu, rotate menuIcon to normal
  sMenuModal.addEventListener("click", function () {
    header.style.maxHeight = headerOriginHeight + "px";
    sMenuModal.style.display = "none";
    sMenuIcon.style.transform = "rotate(0deg)";
  });

  // click on menu item -> hide menu, hide modal, rotate menu icon
  var menuItems = document.querySelectorAll(".menu li a[href*='#']");
  for (i = 0; i < menuItems.length; i++) {
    var menuItem = menuItems[i];
    menuItem.addEventListener("click", function (event) {
      var isParentOfSubMenu =
        this.nextElementSibling &&
        this.nextElementSibling.classList.contains("js-sub-menu");
      if (isParentOfSubMenu) {
        event.preventDefault();
      } else {
        sMenuModal.style.display = "none";
        header.style.maxHeight = headerOriginHeight + "px";
        sMenuIcon.style.transform = "rotate(0deg)";
      }
    });
  }

  // click on 'MORE' of menu, toggle submenu on/off
  var subMenu = document.querySelector(".js-sub-menu");
  var openSubMenu = document.querySelector(".js-open-sub-menu");
  function toggleSubMenu() {
    if (window.innerWidth > 739) {
      return;
    }

    var headerCurrentHeight = header.offsetHeight;

    if (headerCurrentHeight < 350) {
      subMenu.style.position = "relative";
    } else {
      subMenu.style.position = "absolute";
    }
  }
  openSubMenu.addEventListener("click", toggleSubMenu);
}

// Show/hide menuBar when scroll
function menuBarScroll() {
  var navBar = document.querySelector(".js-header");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    // if (window.innerWidth > 740) {
    //   return;
    // }

    // when scroll down
    if (lastScrollY < window.scrollY) {
      // move navBar up to hide it
      navBar.style.transform = "translateY(-100%)";
    } else {
      // show navBar
      navBar.style.transform = "translateY(0)";
    }
    lastScrollY = window.scrollY;
  });
}

function gotoTopPage() {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function lightbox() {
  // disable this script on mobile
  if (window.innerWidth < 740) {
    return;
  }
  const gallery = document.querySelectorAll(
    ".js-info-member .js-member-avatar"
  );
  const previewBox = document.querySelector(".js-preview-box");
  // get close btn
  const previewCloseIcon = previewBox.querySelector(".js-preview-close-icon");
  // get img tag inside previewBox
  const previewImage = previewBox.querySelector(".preview-image img");

  for (let i = 0; i < gallery.length; i++) {
    let newIndex = i;
    let clickImageIndex;
    gallery[newIndex].onclick = () => {
      // get newIndex to ClickImageIndex -> after click we will reset newIndex
      clickImageIndex = newIndex;
      // function get image url for previewBox on each 'click'
      function preview() {
        let selectedImageUrl = gallery[newIndex].src;
        previewImage.src = selectedImageUrl;
      }

      // get previous + next button
      const prevBtn = document.querySelector(".js-prev-btn");
      const nextBtn = document.querySelector(".js-next-btn");

      // default hide previous button when cick on first image
      if (newIndex == 0) {
        prevBtn.style.display = "none";
      }
      // default hide next button when cick on last image
      if (newIndex == gallery.length - 1) {
        nextBtn.style.display = "none";
      }

      // when click on previous button
      prevBtn.onclick = () => {
        newIndex--;
        // if is first img
        if (newIndex == 0) {
          // update previewImage url (avoid hiding previous button but not show first image)
          preview();
          prevBtn.style.display = "none";
        } else {
          preview();
          // show next button
          nextBtn.style.display = "block";
        }
      };

      nextBtn.onclick = () => {
        newIndex++;
        // if is last img
        if (newIndex == gallery.length - 1) {
          // update previewImage url (avoid hiding previous button but not show first image)
          preview();
          nextBtn.style.display = "none";
        } else {
          // show next button
          preview();
          prevBtn.style.display = "block";
        }
      };

      preview();

      // show light Box
      previewBox.classList.add("show");

      // when click on close button
      previewCloseIcon.onclick = () => {
        // reset newIndex, previous button, next button, hide light Box
        newIndex = clickImageIndex;
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
        previewBox.classList.remove("show");
      };
    };
  }
}

window.onload = () => {
  gotoTopPage();
  sMenuControl();
  menuBarScroll();
  lightbox();
  ticketModal();
};
