import { api } from './api'

export type NoteResponse = {
  id: number
  title: string
  content: string
  updatedAt: string
}

export async function getNotes(): Promise<NoteResponse[]> {
  const response = await api.get('/notes')

  return response.data
}

export async function createNoteRequest(
  title: string,
  content: string = ''
): Promise<NoteResponse> {

  const response = await api.post('/notes', {
    title,
    content,
  })

  return response.data
}

export async function updateNoteRequest(
  id: number,
  title: string,
  content: string
): Promise<NoteResponse> {

  const response = await api.put(`/notes/${id}`, {
    title,
    content,
  })

  return response.data
}

export async function deleteNoteRequest(
  id: number
): Promise<void> {

  await api.delete(`/notes/${id}`)
}