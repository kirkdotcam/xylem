const allParents = []
const allChildren = []
let nodeCounter = 0
let NUMPARENTS = 10_000
let NUMCHILDREN = 80_000

class GraphNode{
    constructor({name="node", status="ongoing", ancestors=[], parentName=null, type=null}){

        this.name = name;
        this.ancestors = ancestors;
        this.parentName = parentName;
        this.status = status;
        this.type = type;
        nodeCounter++
    }

    addAncestor(nodeName){
        if (typeof nodeName !== 'number') throw "adding non-string ancestor is not allowed"

        this.ancestors.push(nodeName)

    }


}



function randomStatus(){
    let statusValues = ["ongoing", "complete", "canceled"]
    return statusValues[Math.floor(Math.random()*statusValues.length)]
}

function createParent(name, status, allParents){
    if (status === null || status === undefined) status = randomStatus();
    if (name === null || name === undefined) name = "node"

    let node = new GraphNode({name: name, status: status, type: "parent"})
    allParents.push(node)
    return node
}

function findParentByName(parentName){
    if (parentName > allParents.length -1) return null
    return allParents.filter((parent) => parent.name === parentName)[0]
   
}

function createChild(name, parentName, ancestors){
    //if no parent, find a random parent
    if (parentName === null || parentName === undefined){
        parentName = Math.floor(Math.random()*allParents.length)
    }

    //grabParent ref
    let parentNode = findParentByName(parentName)

    //
    let node = new GraphNode({
        name: name, 
        status: parentNode.status, 
        parentName: parentName, 
        ancestors: [parentName],
        type: "child"
    })
    
    
    let randomAncestor = findRandomChild(parentName)
    if (randomAncestor === undefined) randomAncestor = parentNode
    
    if (randomAncestor.type === "child"){
        node.ancestors = Array.from(new Set(node.ancestors.concat(randomAncestor.ancestors)))
    }

    allChildren.push(node)
    nodeCounter++

}

function findRandomChild(parentName){

    if (parentName){
        let children = allChildren
            .filter((childNode)=> childNode.parentName === parentName)
        
        return children[Math.floor(Math.random()*children.length)]

    } else {

        
        return allChildren[Math.floor(Math.random()*allChildren.length)]
    }
}

while (allParents.length < NUMPARENTS){
    createParent(nodeCounter, randomStatus(), allParents)
}

while ((nodeCounter - NUMPARENTS) < NUMCHILDREN){
    createChild(nodeCounter)
}


// console.log(allParents)
// console.log(allChildren)
console.log(nodeCounter)