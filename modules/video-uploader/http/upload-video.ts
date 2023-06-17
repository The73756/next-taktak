import { client } from '@/utils/client'

export const uploadVideo = async (selectedFile: File) => {
  return client.assets.upload('file', selectedFile, {
    contentType: selectedFile.type,
    filename: selectedFile.name,
  })
}
