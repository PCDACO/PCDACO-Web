export interface UpdateAmenityRequest {
    id: string
    name: string
    description: string
    setName: (name: string) => void
    setDescription: (description: string) => void
    setId: (id: string) => void
}