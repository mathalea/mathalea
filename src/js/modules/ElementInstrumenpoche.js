import iepLoadPromise from 'instrumenpoche'
import { StoreIep } from './Alea2iep'

// On créé l'élément <alea-instrumenpoche id=monId/>
// qui affichera l'animation stockée dans storeIep
export class ElementInstrumenpoche extends HTMLElement {
  constructor () {
    super()
    const id = this.getAttribute('id')
    const xml = StoreIep.getXml(id)
    const divIep = document.createElement('div')
    this.appendChild(divIep)
    loadIep(divIep, xml)
  }
}
// On créé l'élément <alea-boutoninstrumenpoche id=monId/>
// qui affichera l'animation stockée dans storeIep
export class ElementButtonInstrumenpoche extends HTMLElement {
  constructor () {
    super()
    const id = this.getAttribute('id')
    const xml = StoreIep.getXml(id)
    const divIep = document.createElement('div')
    const button = document.createElement('button')
    divIep.style.display = 'none'
    button.innerText = 'Montrer l\'animation'
    button.classList.add('block',
      'px-6', 'py-2.5', 'mr-10', 'my-5', 'ml-6', 'bg-coopmaths', 'text-white', 'font-medium', 'text-xs', 'leading-tight', 'uppercase', 'rounded', 'shadow-md',
      'transform', 'hover:scale-110', 'hover:bg-coopmaths-dark', 'hover:shadow-lg', 'focus:bg-coopmaths-dark', 'focus:shadow-lg', 'focus:outline-none', 'focus:ring-0', 'active:bg-coopmaths-dark', 'active:shadow-lg', 'transition', 'duration-150', 'ease-in-out', 'checkReponses')
    button.onclick = function () {
      if (divIep.style.display === 'none') {
        divIep.style.display = 'block'
        button.innerText = 'Cacher l\'animation'
      } else {
        divIep.style.display = 'none'
        button.innerText = 'Montrer l\'animation'
      }
    }
    this.appendChild(button)
    this.appendChild(divIep)
    loadIep(divIep, xml)
  }
}

async function loadIep (container, xml, options = {}) {
  try {
    const iepApp = await iepLoadPromise(container, xml, options)
    // la figure est chargée et l'animation lancée, si l'on veut rester en pause au début
    // (en attendant une option autostart)
    // le premier doc (le seul pour le moment)
    const doc = iepApp.docs[0]
  } catch (error) {
    // gérer l'erreur pour prévenir l'utilisateur du pb
  }
}
