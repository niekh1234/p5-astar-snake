function genPath(){
    let nodes = [];
    // generating an array from the current board.
    for(let i = 0; i < gridSize; i++){
        nodes.push([]);
        for(let j = 0; j < gridSize; j++){
            const hCost = (Math.abs(i * 40 - foodX) + Math.abs(j * 40 - foodY)) / 4
            nodes[i].push(new iNode(i, j, 0, hCost, 0, false, false, null));
        }
    }
    // adding the snake as obstruction.
    snake.forEach((bodyPart)=>{
        nodes[bodyPart[0] / 40][bodyPart[1] / 40].obstruction = true;
    })
    return astar(nodes)
}

// WARNING astar not 100% efficient yet.
function astar(nodes){
    let openList = [];
    // the snake's head is the start node.
    const start = snake[0];

    const startFCost = (Math.abs(start[0] - foodX) + Math.abs(start[1] - foodY)) / 4;
    // creating a node. We don't care for the hcost at the moment, only when we look at neighbours.
    const startNode = new iNode(start[0] / 40, start[1] / 40, 0, startFCost, startFCost, false, true, null);
    openList.push(startNode);

    while (openList.length > 0){
        // sorting openList to get the min value (aka our next best node)
        openList.sort(function(a,b) {
            return a.fCost - b.fCost;
        });
        const currentNode = openList[0];
        currentNode.visited = true;

        // if the food is reached, trace path.
        if(currentNode.x * 40 == foodX && currentNode.y * 40 == foodY){
            return reconstructPath(currentNode);
        }

        // // Uncomment if you want to see which path it wants to take.
        // fill(255);
        // rect(currentNode.x * 40, currentNode.y * 40, 40, 40);

        const currentNodeIndex = openList.indexOf(currentNode);
        openList.splice(currentNodeIndex, 1);

        const neighBours = getNeighBours(currentNode, nodes, openList);

        neighBours.forEach((neighbour)=>{
            const gCost = currentNode.gCost + 10; //added gcost is always 10 because we don't move diagonally.

            // I have a gut feeling there is something wrong here. Thing is that it does find the shortest path pretty much always.
            if (!openList.includes(neighbour) && gCost >= currentNode.gCost && !neighbour.visited){
                openList.push(neighbour);

                neighbour.parent = currentNode;
                neighbour.gCost = gCost;
                neighbour.fCost = neighbour.gCost + neighbour.hCost;
            }
        })
    }
}

function reconstructPath(endNode){
    let current = endNode;
    // fill a list with all the squares the snake needs to visit to reach the food.
    let squareList = [];

    while(current.parent != null){
        squareList.push([current.x * 40, current.y * 40]);
        current = current.parent;
    }

    return squareList;
}

function getNeighBours(node, nodes, openList){
    let neighbours = [];

	for(let x = -1; x <= 1; x++){
		for(let y = -1; y <= 1; y++){
            // don't look at diagonals from node, you can't move diagonally in snake.
			if(Math.abs(x) == Math.abs(y)){
				continue;
            }
            // Continue if out of bounds.
            if(node.x + x < 0 || node.x + x >= gridSize || node.y + y < 0 || node.y + y >= gridSize){
                continue;
            }
            
            let neighbourNode = nodes[node.x + x][node.y + y];

			if(!neighbourNode.obstruction){
                neighbours.push(neighbourNode);
			}
		}
    }
    
    return neighbours;
}