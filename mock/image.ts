const createImage = (width: number, height: number) => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    
    const ctx = canvas.getContext('2d')

    if (!ctx) throw new Error('Could not get canvas context');

    ctx.fillStyle = 'rgba(0, 0, 0, 0)'
    ctx.fillRect(0, 0, width, height)
    
    return canvas.toDataURL()
}

export default createImage(500, 500)