

export default function wakeButtons(t="15%", h=50, f="65%", b=35, a=12 ) {
  const h1 = document.getElementById("text");
  if (h1 != null) {
    h1.style.top = t;
    h1.style.fontSize = h + "px";
    h1.style.opacity = "100";
  }
  const form = document.getElementById("name");
  if (form != null) {
    form.style.top = f;
    form.style.opacity = "100";
  }
  const buttons = document.getElementsByTagName("button");
  let pros = b;
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.top = pros.toString() + "%";
    pros += a;
    buttons[i].style.opacity = "100";
  }
  window.scroll(0, document.body.scrollHeight);
};