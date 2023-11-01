export default function getCurrDirectoryView(objects: string[]) {
    const currentDirectoryItems: string[] = []
    
    objects.forEach((object: string) => {
        const neededPart = object.split('/');
        
        if(!currentDirectoryItems.includes(neededPart[0])) {
            currentDirectoryItems.push(neededPart[0])
        }
    })
    
    return currentDirectoryItems;
    
}