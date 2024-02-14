$(function () {
  // xeicon 접근성
  $("[class*='xi-']").attr("aria-hidden", "true");
  // a link 새 창으로 열림 자동 타이틀
  $("a[target='_blank']").attr("title", "새 창으로 열림");

  // header 스크롤 고정
  function headerfixed() {
    var height = $("#header").height();
    var scroll = $(window).scrollTop();
    if (scroll >= height) {
      $("#header").addClass("scroll");
    } else {
      $("#header").removeClass("scroll");
    }
  }
  document.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.gnb__item a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (section.getAttribute('id') === link.getAttribute('href').substring(1)) {
                    link.classList.add('active');
                }
            });
        }
    });
});


  // body 스크롤 고정
  let scrollPosition = 0;
  const body = document.querySelector("body");

  function bodyfixOn() {
    scrollPosition = window.pageYOffset;
    body.style.top = -scrollPosition + "px";
    scrollHeight = $("body").scrollTop();
    $("body").addClass("fix");
  }

  function bodyfixOff() {
    body.style.removeProperty("top");
    $("body").removeClass("fix");
    window.scrollTo(0, scrollPosition);
  }


  // select box
  const label = document.querySelectorAll(".select-label");
  label.forEach(function (lb) {
    lb.addEventListener("click", (e) => {
      let optionList = lb.nextElementSibling;
      let optionItems = optionList.querySelectorAll(".option-item");
      clickLabel(lb, optionItems);
    });
  });
  const clickLabel = (lb, optionItems) => {
    if (lb.parentNode.classList.contains("active")) {
      lb.parentNode.classList.remove("active");
      optionItems.forEach((opt) => {
        opt.removeEventListener("click", () => {
          handleSelect(lb, opt);
        });
      });
    } else {
      lb.parentNode.classList.add("active");
      optionItems.forEach((opt) => {
        opt.addEventListener("click", () => {
          handleSelect(lb, opt);
        });
      });
    }
  };
  const handleSelect = (label, item) => {
    label.innerHTML = item.textContent;
    label.parentNode.classList.remove("active");
    label.classList.add("selected");
  };

  $(document).mouseup(function (e) {
    var selectBox = $(".select-style");
    if (selectBox.has(e.target).length === 0) {
      selectBox.removeClass("active");
    }
  });

  // top 버튼
  function topBtn() {
    var btn = $(".top__btn, .header__logo > a");

    btn.on("click", function () 
    {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        600
      );
    
      return false;
    });
  };

  // popup
  function popup() {
    $(".popup-open").on("click", function () {
      if ($("#header").hasClass("scroll")) {
        $("#header").addClass("on");
      }
      $(".popup__wrap").fadeIn(340);
      bodyfixOn();
      return false;
    });
    $(".popup__close, .popup__btn").on("click", function () {
      $("#header").removeClass("on");
      $(".popup__wrap").fadeOut(340);
      bodyfixOff();
      return false;
    });
    $(document).mouseup(function (e) {
      if ($(".popup__wrap").has(e.target).length === 0 && $(".popup__wrap").is(":visible")) {
        $("#header").removeClass("on");
        $(".popup__wrap").fadeOut(340);
        bodyfixOff();
      }
    });
  }
  

  // submit popup
  function subPopup() {
    // Intercept form submission to show confirmation popup
    $("#inquiryform").on("submit", function(event) {
        event.preventDefault(); // Prevent default form submission
        if ($("#header").hasClass("scroll")) {
            $("#header").addClass("on");
        }
        $(".submit-popup__wrap").fadeIn(340); // Show the confirmation popup
        bodyfixOn();
    });

    // Handle confirmation from the popup
    $(".submit-popup__btn--check").on("click", function() {
        var formData = $("#inquiryform").serialize(); // Serialize the form data

        $.ajax({
            type: 'POST',
            url: 'http://www.fastpace.kr:8080/submit-inquiry',
            data: formData,
            success: function(response) {
                alert("문의 등록을 완료하였습니다."); // Show success message
                $("#inquiryform")[0].reset(); // Reset the form
                $("#header").removeClass("on");
                $(".submit-popup__wrap").fadeOut(340); // Close the popup
                bodyfixOff();
            },
            error: function() {
                alert("문의 등록에 실패하였습니다."); // Show error message
                $("#header").removeClass("on");
                $(".submit-popup__wrap").fadeOut(340); // Close the popup
                bodyfixOff();
            }
        });
    });

    // Cancel button in the popup
    $(".submit-popup__btn--cancel").on("click", function() {
        $("#header").removeClass("on");
        $(".submit-popup__wrap").fadeOut(340);
        bodyfixOff();
    });
    $(".submit-popup__close").on("click", function() {
      $("#header").removeClass("on");
      $(".submit-popup__wrap").fadeOut(340);
      bodyfixOff();
  });
}

    $(document).mouseup(function (e) {
      if ($(".submit-popup__wrap").has(e.target).length === 0 && $(".submit-popup__wrap").is(":visible")) {
        $("#header").removeClass("on");
        $(".submit-popup__wrap").fadeOut(340);
        bodyfixOff();
      }
    });
  


  // 섹션 이동
  $(".gnb__item > a, .header__btn").on("click", function () {
    $("html, body").animate({ scrollTop: $(this.hash).offset().top - 80 }, 600);
    return false;
  });

  AOS.init({
    duration: 1000,
    once: true,
    disable: function () {
      var maxWidth = 861;
      return window.innerWidth < maxWidth;
    }
  });

  headerfixed();
  topBtn();
  popup();
  subPopup();

  $(window).on("scroll", function () {
    headerfixed();
  });
});
  
