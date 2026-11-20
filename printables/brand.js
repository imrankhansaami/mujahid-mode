// Edit this one file to rebrand the printable pack.
// The values are applied to every element marked data-brand / data-tagline / data-footer.
window.PRINTABLE_BRAND = {
  name: 'Mujāhid Mode',
  tagline: 'The disciplined Muslim code',
  footer: 'The disciplined Muslim code',
}

document.querySelectorAll('[data-brand]').forEach((el) => {
  el.textContent = window.PRINTABLE_BRAND.name
})

document.querySelectorAll('[data-tagline]').forEach((el) => {
  el.textContent = window.PRINTABLE_BRAND.tagline
})

document.querySelectorAll('[data-footer]').forEach((el) => {
  el.textContent = window.PRINTABLE_BRAND.footer
})