
function intersects(r1: DOMRect, r2: DOMRect) {
  return !(
    r2.x > r1.x + r1.width ||
    r2.x + r2.width < r1.x ||
    r2.y > r1.y + r1.height ||
    r2.y + r2.height < r1.y
  )
}

import type { Action } from 'svelte/action'

import { writable } from 'svelte/store'
export const boxes = writable<{ [i: number]: HTMLElement }>({})

export const collides: Action<HTMLElement> = (node) => {
  let $boxes: { [i: number]: HTMLElement }
  boxes.subscribe((value) => {
    $boxes = value

    checkCollisions()
  })

  function checkCollisions() {
    const us = node.getBoundingClientRect()
    
    node.classList.remove('collides')
    Object.values($boxes).filter(them => them).map(them => them.getBoundingClientRect()).forEach(them => {
      if (intersects(us, them)) {
        node.classList.add('collides')
      }
    })
  }

  window.addEventListener("scroll", checkCollisions)

  return {
    destroy() {
      window.removeEventListener("scroll", checkCollisions)
    },
  }
}
