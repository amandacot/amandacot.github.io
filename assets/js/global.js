const currentTheme = localStorage.getItem("theme");
if (currentTheme == "light") {
  $("body").addClass("light");
  $(".moon").addClass('sun');
  $(".toggle-night").addClass('toggle-day');
  $(".navbar-dark").addClass('navbar-light');
  $(".bg-dark").addClass('bg-light');
}
$('.toggle-night').click(function() {
  $("body").toggleClass('light');
  $(".moon").toggleClass('sun');
  $(".toggle-night").toggleClass('toggle-day');
  $(".navbar-dark").toggleClass('navbar-light');
  $(".bg-dark").toggleClass('bg-light');

  let theme = "dark";
  // const navbar = document.querySelector("nav");
  // const navbarClasses = navbar.classList;
  if ($("body").hasClass("light")) {
    theme = "light";
    // navbar.classList.remove("navbar-dark", "bg-dark");
    // navbar.classList.add("navbar-light", "bg-light");
  }
  // else {
  //   navbar.classList.remove("navbar-light", "bg-light");
  //   navbar.classList.add("navbar-dark", "bg-dark");
  // }
  localStorage.setItem("theme", theme);

});

const canvas = document.querySelector(".hero-grid-canvas");

if (canvas) {
  const ctx = canvas.getContext("2d");

  const squareSize = 44;
  const gridColor = "rgba(102, 74, 140, 0.10)";
  const hoverColor = "#664A8C";

  let width;
  let height;
  let hoveredColumn = -1;
  let hoveredRow = -1;

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    width = rect.width;
    height = rect.height;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    drawGrid();
  }

  function drawGrid() {
    ctx.clearRect(0, 0, width, height);

    // Fill the currently hovered square
    if (hoveredColumn >= 0 && hoveredRow >= 0) {
      ctx.fillStyle = hoverColor;
      ctx.fillRect(
        hoveredColumn * squareSize,
        hoveredRow * squareSize,
        squareSize,
        squareSize
      );
    }

    // Draw vertical and horizontal grid lines
    ctx.beginPath();
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;

    for (let x = 0; x <= width; x += squareSize) {
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, height);
    }

    for (let y = 0; y <= height; y += squareSize) {
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(width, y + 0.5);
    }

    ctx.stroke();
  }

  canvas.addEventListener("pointermove", (event) => {
    const rect = canvas.getBoundingClientRect();

    hoveredColumn = Math.floor(
      (event.clientX - rect.left) / squareSize
    );

    hoveredRow = Math.floor(
      (event.clientY - rect.top) / squareSize
    );

    drawGrid();
  });

  canvas.addEventListener("pointerleave", () => {
    hoveredColumn = -1;
    hoveredRow = -1;
    drawGrid();
  });

  window.addEventListener("resize", resizeCanvas);

  resizeCanvas();
}
