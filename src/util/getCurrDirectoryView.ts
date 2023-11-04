export default function getCurrDirectoryView(objects: string[], absolutePath: string) {
    const currentDirectoryItems: string[] = []
    
    if( objects && objects.length > 0 ) {
        objects.forEach((object: string) => {
            const neededPart = object.replace(absolutePath, '').split('/');
            
            if(!currentDirectoryItems.includes(neededPart[0])) {
                currentDirectoryItems.push(neededPart[0])
            }
        })
        return currentDirectoryItems;
    } 
    return []
}