export function getCustomProperty(elem, property) {
    return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0
}

export function setCustomProperty(elem, prop,value) {
    elem.style.setProperty(prop, value)
}

export function incrementCustomProperty(elem, prop, inc) {
    setCustomProperty(elem, prop, getCustomProperty(elem, prop)+inc)
}