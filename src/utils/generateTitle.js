export function generateTitle(text) {
  const clean = text.trim().replace(/\s+/g, " ");
  if (!clean) return "New conversation";
  return clean.length > 40 ? clean.slice(0, 40) + "…" : clean;
}