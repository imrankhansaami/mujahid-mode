// Print / Save PDF, plus clickable checkboxes and keyboard support.

document.querySelectorAll('[data-print]').forEach((button) => {
  button.addEventListener('click', () => window.print())
})

document.querySelectorAll('.box').forEach((box) => {
  box.setAttribute('role', 'checkbox')
  box.setAttribute('tabindex', '0')
  box.setAttribute('aria-checked', box.classList.contains('checked') ? 'true' : 'false')

  const toggle = () => {
    box.classList.toggle('checked')
    box.setAttribute('aria-checked', box.classList.contains('checked') ? 'true' : 'false')
  }

  box.addEventListener('click', toggle)
  box.addEventListener('keydown', (event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      toggle()
    }
  })
})

// Make the ruled areas behave like a page: Enter continues the line.
document.querySelectorAll('[contenteditable="true"]').forEach((area) => {
  area.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      document.execCommand('insertLineBreak')
    }
  })
})