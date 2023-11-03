export interface tree {
    [index:string]: {}
}

export default function getObjectTree(objectNames: string[]) {
    const tree: tree = {};
    
    objectNames.forEach((objectName) => {
        let parts = objectName.split('/');
        
        if(parts[parts.length - 1].includes('.txt')) {//remove filenames
            parts = parts.slice(0, parts.length - 1)
        }
        
        let currentNode: tree = tree;
        
        parts.forEach((part) => {
            currentNode[part] = currentNode[part] || {};
            currentNode = currentNode[part]
        })
    })
    
    return tree;
}