$("#infographic article").click(function () {
   $(this).toggleClass("active");
});
$("#infographic article .controls .btn").on("click", function (e) {
   e.preventDefault();
   e.stopPropagation();
   var currentEl = $(this).closest("article");
   var currentI = currentEl.data("step");
   currentEl.removeClass("active");
   var nextI = $(this).is(":first-child") ? currentI - 1 : currentI + 1;
   var nextEl = $("article[data-step='" + nextI + "']");
   nextEl.click();
   var y = document
      .querySelector("article[data-step='" + nextI + "'")
      .getBoundingClientRect().top;
   var supportsNativeSmoothScroll =
      "scrollBehavior" in document.documentElement.style;

   if (supportsNativeSmoothScroll) {
      window.scrollTo({
         top: y + window.pageYOffset - 300,
         behavior: "smooth"
      });
   } else {
      window.scrollTo(0, y + window.pageYOffset - 300);
   }
});
$(document).mouseup(function (e) {
   var tgt = $("#infographic article.active");
   if (!tgt.is(e.target) && tgt.has(e.target).length === 0)
      tgt.removeClass("active");
});

var checkboxValues = JSON.parse(localStorage.getItem("checkboxValues")) || {},
  $checkboxes = $("#checkbox-container :checkbox");

$checkboxes.on("change", function () {
  $checkboxes.each(function () {
    checkboxValues[this.id] = this.checked;
  });

  localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
});

// On page load
$.each(checkboxValues, function (key, value) {
  $("#" + key).prop("checked", value);
});

