export const selectImageFile = (): Promise<File | null> => {
  return new Promise((resolve) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'

    input.onchange = () => {
      const file = input.files?.[0]
      resolve(file || null)
    }

    input.click()
  })
}