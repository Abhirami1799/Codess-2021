class BackTracking
{
    constructor()
    {
        this.N = 0;
    }

    solveRoute(start, end, adjacencyMatrix)
    {
        var graph = grid.graph,
        arrayOfInter = grid.arrayOfInter,
        start = graph.getNodeAt(startX, startY),
        end = graph.getNodeAt(endX, endY),
        i, j;

        /*
            algo has been split into different sections for ease of understanding
        */
    
        var route = [], solution = [];
        /*
            arrayOfInter is an array of intermediate coordinates [x,y]
        */

        route.push(start);
        start.id = 0;
    
        for(i = 0; i < arrayOfInter.length; i++)
        {
            var interNode = graph.getNodeAt(arrayOfInter[i].x, arrayOfInter[i].y);
            route.push(interNode);
            route[i + 1].id = i + 1;
        }

        route.push(end);
        route[i + 1].id = i + 1;

        //console.log("routeNew..."+routeNew[0].id);//[0].f+" "+route[0].x+","+route[0].y);

        var l = route.length,
            adjacencyMatrix = [];
      
        for(i = 0; i < l; i++)
        {
            var temp = [];
            for(j = 0; j < l; j++)
            {
                if(i == j)
                {
                    temp.push(0);
                }
                else
                {
                    temp.push(Infinity);
                }
            }
            adjacencyMatrix.push(temp);
        }

        for(i = 0; i < l; i++)
        {
            for(j = i + 1; j < l; j++)
            {
                //console.log("Populating Adjacency Matrix"+i+" "+j);
                grid.fixGrid();
                var path = this.searchAlgo.pathFinder(route[i].x, route[i].y, route[j].x, route[j].y, graph, 'a-star', color = true);
                //console.log(this.searchAlgo.pathCost);

                if(path.length)
                {
                    adjacencyMatrix[i][j] = adjacencyMatrix[j][i] = this.searchAlgo.pathCost;
                }
            }
            //console.log("Adjacency Matrix..."+adjacencyMatrix[i]);
        }

        var solve = function(index)
        {
            if(index == this.N)
            {
                return true;
            }

            for()
        }

        grid.resetVisited();

        solution.push(start);
        start.isVisited = true;
    }
};
