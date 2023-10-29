export interface directoryElement  {
    name: string,
    subDirectoriesCount: number,
    subDirectories: directoryElement[]
    content: string,
    id: number
}