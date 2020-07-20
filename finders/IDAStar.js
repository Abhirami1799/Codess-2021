/*
Iterative-deepening A*. The iterative-deepening technique used for depth-first search (IDDFS) as 
mentioned above can also be used for an A* search. This entirely eliminates the Open and Closed lists. Do
a simple recursive search, keep track of the accumulated path cost g(n), and cut off the search when the 
rating f(n) = g(n) + h(n) exceeds the limit. Begin the first iteration with the cutoff equal to h(start),
and in each succeeding iteration, make the new cutoff the smallest f(n) value which exceeded the old 
cutoff. Similar to IDDFS among brute-force searches, IDA* is asymptotically optimal in space and time 
usage among heuristic searches.
*/

function IDAStar(options)
{
    options = options || {};

    if (!options.allowDiagonal)
    {
        this.diagonalOption = DiagonalOptions.Never;
        this.heuristic = options.heuristic || Heuristic.Manhattan;
    }
    
    else 
    {
        this.heuristic = options.heuristic || Heuristic.Octile;
        if (options.dontCrossCorners)
        {
            this.diagonalOption = DiagonalOptions.noNeighborBlocked;
        }
    
        else
        {
            this.diagonalOption = DiagonalOptions.oneNeighborBlocked;
        }
    }
}

IDAStar.prototype.pathFinder = function(startX, startY, endX, endY, graph)
{
    graph.resetVisited();
    /*
        haven't implemented time limit
    */
    var h = function(a, b) {
        return this.heuristic(Math.abs(b.x - a.x), Math.abs(b.y - a.y));
    }.bind(this);

    var cost = function(a, b) {
        return (diag = (a.x === b.x || a.y === b.y) ? 1 : Math.SQRT2) * ((a.weight + b.weight) / 2.0);
    };

    this.startTime = new Date().getTime();

    var start = graph.getNodeAt(startX, startY),
        end = graph.getNodeAt(endX, endY),
        threshold = this.heuristic(Math.abs(startX - endX), Math.abs(startY - endY)),
        maxDepth = graph.rowCount * graph.columnCount,
        path = [], temp = false;

    var search = function(currentNode, g, threshold, path, depth)
    {
        var timeDiff = new Date().getTime() - this.startTime;
        if (timeDiff > 7000) {
            // Enforced as "path-not-found".
            alert("Sorry IDAStar is taking a lot of time 😢");
            return Infinity;
        }
        //console.log("...parent");
        if(currentNode === end)
        {
            /*
                path starts being populated only after the end node is found
            */
            path[depth] = [currentNode.x, currentNode.y];
            return true;
        }
        /*
            g - distance from source of currentNode
            h - distance to end from currentNode
            f = g + h
        */
        f = g + h(currentNode, end);
        /*
            when a node with f > cutoff value found, return the new cutoff
        */
        if(f > threshold)
        {
            return false;
        }

        //var box = graph.getBox(currentNode.y, currentNode.x);

        /*else
        {
            currentNode.isVisited = true;
        }*/

        var neighbors = graph.getNeighbors(currentNode.x, currentNode.y, this.diagonalOption), i; //temp = null, min = Infinity,
            

        for(i = 0; i < neighbors.length; i++)
        {
            var neighbor = neighbors[i];/*,
                val = (currentNode.weight + neighbor.weight) / 2.0,
                isDiag = false;
        
            if(neighbor.x !== currentNode.x && neighbor.y !== currentNode.y)
            {
                isDiag = true;
            }
        
            var gNew = g + cost(currentNode, neighbor);*/

            /*if(!neighbor.isVisited)
            {*/
                neighbor.count = neighbor.count + 1 || 1;//Animate.setTraversed(neighbor);
                /*if(neighbor.count % 2 == 0)
                {
                    neighbor.resetTraversed();
                }
                else
                {*/
                    neighbor.setAsTraversed();
                //}
                //console.log("child-"+i);
                temp = search(neighbor, g + cost(currentNode, neighbor), threshold, path, depth + 1);
            /*}

            else
            {
                continue;
            }*/

            /*
                Search() returns a Node object only when the goal has been found
            */
            if(temp == true)
            {
                /*
                    retracing path - once end node is found, keep returning the end node in temp
                    and adding the currentNode in path
                */
                path[depth] = [currentNode.x, currentNode.y];
                return true;
            }

            if(temp == Infinity)
            {
                return Infinity;
            }

            /*
                In case the goal is not found for the current threshold, temp would carry the minimum 
                'f' that crosses the threshold. We return this value to be made the new threshold.
            */ 
            /*if(temp < min)
            {
                min = temp;
            }*/
        }
        return(false);

    }.bind(this);

    while(!temp)
    {
        path = [];

        graph.resetVisited();

        temp = search(start, 0, threshold, path, 0);

        if(temp == Infinity)
        {
            return [];
        }

        /*
            when goal is found, end node is returned
        */
        /*if(temp instanceof Node)
        {
            return(path.reverse());
        }*/

        /*
            when goal cannot be found, threshold value returned would become very big over time
        */
        if(threshold >= maxDepth)
        {
            alert("Sorry...No path found 😢");
            return [];
        }

        /*
            if none of the above conditions are true, temp would be the minimum 'f' that crossed 
            the threshold.
        */
        if(temp == false)
        {
            threshold++;
        }
    }

    return(path);

    //return [];
};