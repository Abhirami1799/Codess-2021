//var MinPathSort = require('./Finders/MinPathSort');

function MultipleStops(options)
{
    options = options || {};

    this.allowDiagonal = options.allowDiagonal;
    this.dontCrossCorners = options.dontCrossCorners;
    this.heuristic = !options.allowDiagonal ? 
                     (options.heuristic || Heuristic.Manhattan) : 
                     (options.heuristic || Heuristic.Octile);
    this.searchAlgo = new AStar({'allowDiagonal' : this.allowDiagonal,
                                  'dontCrossCorners' : this.dontCrossCorners,
                                  'heuristic' : this.heuristic});
    this.maxCost = options.maxCost || 100;
    this.w = 0.6;
    this.bruteForce = false;
}

MultipleStops.prototype.pathFinder = function(startX, startY, endX, endY, grid, lines)
{
    var graph = grid.graph,
        arrayOfInter = grid.arrayOfInter,
        start = graph.getNodeAt(startX, startY),
        end = graph.getNodeAt(endX, endY),
        i, j;

    /*
        algo has been split into different sections for ease of understanding
    */
    
    var route = [];
    /*
        arrayOfInter is an array of intermediate coordinates [x,y]
    */

    route.push(start);
    start.id = 0;
    //routeNew.push(start);

    for(i = 0; i < arrayOfInter.length; i++)
    {
        var interNode = graph.getNodeAt(arrayOfInter[i].x, arrayOfInter[i].y);
        route.push(interNode);
        //routeNew.push(null);
        route[i + 1].id = i + 1;
    }

    route.push(end);
    //routeNew.push(end);
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

    /*var branchAndBound = new BranchAndBound(),
        routeNew = branchAndBound.travelingSalesman(adjacencyMatrix);*/
        
    /*
        g = distance from start to the current node covering all previous stations in the
            route.
        h = distance from the current node to end (no stations in between)
        f = g + h
    */
   

    start.g = 0;
    end.h = 0;
    end.g = end.f = start.h = start.f = adjacencyMatrix[0][l - 1];
    //console.log("f-" + start.f + " h-" + start.h + " l-" + l);
/*
    var tempHeap = new TempHeap();
    console.log("route0..."+route.shift());
    while(route.length > 1)
    {
        var node = route.shift();
        console.log("Node-"+node);
        tempHeap.insert({f: Infinity, del: Infinity, coord: [node.x, node.y]});
    }

    console.log("Heap-"+tempHeap);

    var updateF = function(firstNode, lastNode)
    {
        //for(i = 0; i < tempHeap.elements.length; i++)
        //{
        //console.log("firstNodeid-"+firstNode.id);
        var array = tempHeap.elements;
        array.forEach(element => {var node = graph.getNodeAt(element.coord[0], element.coord[1]);
                                  node.g = adjacencyMatrix[firstNode.id][node.id] + firstNode.g;
                                  node.h = adjacencyMatrix[node.id][lastNode.id];
                                  node.f = node.g + node.h; 
                                  if(node.f > element.f)
                                  {
                                    tempHeap.increaseKey(node.f, Math.abs(node.g - node.h), element.x, element.y);
                                  }
                                  
                                  else if(node.f < element.f)
                                  {
                                    tempHeap.decreaseKey(node.f, Math.abs(node.g - node.h), element.x, element.y);
                                  }

                                  else
                                  {
                                    Math.abs(node.g - node.h) < element.del ?
                                    tempHeap.decreaseKey(node.f, Math.abs(node.g - node.h), element.x, element.y) :
                                    tempHeap.increaseKey(node.f, Math.abs(node.g - node.h), element.x, element.y);
                                  }
                                });
        //}
    }

    var binarySort = function(first, mid, last)
    {
        if(last == first + 1)
        {
            console.log("returning...");
            return;
        }

        //mid = Math.floor((first + last) / 2.0);
        console.log("first-"+first+" last-"+last+" mid-"+mid);
        //console.log(routeNew[first].id+","+routeNew[last].id);
        updateF(routeNew[first], routeNew[last]);
        var val = tempHeap.popMin();
        routeNew[mid] = graph.getNodeAt(val.coord[0], val.coord[1]);
        console.log("recurse1, mid-"+mid);
        binarySort(first, Math.floor((first + mid) / 2.0), mid);
        console.log("recurse2, mid-"+mid);
        binarySort(mid, Math.floor((mid + last) / 2.0), last);
    }.bind(this);
   
    var mid = Math.floor((l - 1)/2.0);
    binarySort(0, mid, l - 1);*/
    for(i = 1; i < l - 1; i++)
    {
        //console.log("Sorting---i-"+i);
        for(j = i; j < l - 1; j++)
        {
            console.log("Sorting...i-"+i+" j-"+j+" route-id-"+route[i - 1].id+","+route[j].id);
            route[j].g = adjacencyMatrix[route[i - 1].id][route[j].id] + route[i - 1].g;
            route[j].h = adjacencyMatrix[route[j].id][route[l - 1].id];
            route[j].f = this.w * route[j].g + (1 - this.w) * route[j].h;

            console.log("f..."+route[j].f+", "+route[i].f);

            if(route[j].f < route[i].f)
            {
                var temp = route[i];
                route[i] = route[j];
                route[j] = temp;
            }
            console.log(route);
        }
    }

    //console.log("Adjacency Matrix..."+adjacencyMatrix);
    //console.log("ROUTE..."+routeNew);
    //grid.resetTraversal();
     
    var lastInter = -1, path = [];
  
    for(var i = l - 2; i >= 0; i--)
    {
        if(route[i].f <= this.maxCost)
        {
            //console.log("Comparing f-" + routeNew[i].f + " to maxCost-" + this.maxCost);
            lastInter = i;
            break;
        }
    }

    if(lastInter == -1)
    {
        alert("Sorry... No way to cover all nodes 😢");
        return [];
    }

    /*console.log("routeNew");
    console.log(routeNew);*/

    for(i = 0; i <= lastInter; i++)
    {  
        //console.log(i);
         
        //var prev = tempPath.length ? graph.getNodeAt(tempPath[tempPath.length - 1][0], tempPath[tempPath.length - 1][1]) : null;

        grid.graph.resetVisited();

        if(i == lastInter)
        {
            path = this.searchAlgo.pathFinder(route[i].x, route[i].y, route[l - 1].x, route[l - 1].y,
                                                graph, 'a-star', color = false);
        }

        else
        {
            path = this.searchAlgo.pathFinder(route[i].x, route[i].y, route[i + 1].x, route[i + 1].y,
                                                graph, 'a-star', color = false);
        }
                   
        //console.log("i..."+i);
        /*var node = graph.getNodeAt(path[0][0], path[0][1]);
        node.parent = prev;*/
            
            //console.log("x1-"+routeNew[i].x+" y1-"+routeNew[i].y+" x2-"+routeNew[l-1].x+" y2-"+routeNew[l-1].y);
            //console.log(path.length);
        console.log(path);

        if(path.length - 2 > 0)
        {
            var prevPoint = [path[0][0], path[0][1]];
            for(j = 1; j < path.length - 1; j++)
            {
                console.log(j);
                var box = graph.getNodeAt(path[j][0], path[j][1]);
                box.setAsPath();
                lines.drawLine(prevPoint[0], prevPoint[1], box.x, box.y);
                prevPoint = [box.x, box.y];
            }
            lines.drawLine(prevPoint[0], prevPoint[1], path[path.length - 1][0], path[path.length - 1][1]);
        }
    }

    return [];
}

