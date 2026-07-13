try {
  const saved = JSON.parse(localStorage.getItem("cyberscope.preferences") || "{}") as { theme?: unknown };
  const dark = saved.theme === "dark";
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
} catch {
  document.documentElement.classList.remove("dark");
  document.documentElement.style.colorScheme = "light";
}
