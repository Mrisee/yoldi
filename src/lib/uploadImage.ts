export async function uploadImage(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  const res = await fetch('https://frontend-test-api.yoldi.agency/api/image', {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) throw new Error('Ошибка загрузки изображения')
  return res.json() 
}