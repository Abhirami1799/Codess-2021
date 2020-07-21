# Pirates On Mars

This is a path finding application that covers **three** path finding and optimization problems. Imagine you and your friends are on a spacecraft. You could be faced with all kinds of unprecedented problems like space debris, low fuel, and what not! We have modelled this application, keeping in mind such scenarios. The application allows you to _choose the locations of the source and destination_, set **obstacles** in space, and define difficult environments as **weighted** nodes for every problem. Before we understand the remaining features and functionalities, let's look at the three aforementioned problems:

1. Find the **_shortest_** path from Earth _(source)_ to Mars _(destination)_. You can define the state of the space using various features, choose an algorithm from the panel, set the visualization speed, select weights of all the weighted nodes, and click visualize to see the pathfinder build the path.

2. Traveling Salesman - Define **_intermediate stations_** and find the least cost path that starts from Earth _(source)_, covers all intermediate points _(stations)_, reaches Mars _(destination)_ at some point and returns to Earth.

3. Path optimization with a maximum cost constraint - Suppose your spacecraft is on a rescue mission. Every intermediate station is a **_space station_** and has someone who needs your help to escape. But alas, your craft has a limited amount of fuel, and you must reach Mars _(destination)_ before you run out. The _Multiple Stops_ algorithm tries to optimize at every point, so that with the available fuel, you can reach your destination, while saving as many people as you can, on your way there. The default maximum value of the cost that can be incurred on the journey is set to 100. You can change it by entering the value in the **_Maximum Cost_** input box.

### Algorithm Division:

* Shortest Path Between 2 Nodes:

    1. ID Depth First Search
    2. Best First Search
    3. AStar
    4. IDAStar
    5. Dijkstra

* Traveling Salesman:

    1. Traveling Salesman _(branch and bound)_

* Path Optimization with Multiple Nodes and a Maximum Cost:

    1. Multiple Stops _(f-score optimization like AStar)_

The last two algorithms may be used for the first case too.

### Using The Web Interface:

The navigation panel contains various radio buttons to set different nodes :

* **Start Node** _(source - green)_ - To change the location of the starting point.

* **End Node** _(destination - red)_ - To change the location of the end point.

* **Wall Node** _(obstacles - black)_ - To set obstacles in space. These are essentially nodes with their weights set to **_Infinity_**

* **Weight Node** _(difficult regions to traverse - yellow)_ - To set regions in space that are difficult to traverse,   i.e., would cost more. The **_Weight_** dropdown allows you to set the weight values of these nodes.

* **Station Node** _(intermediate points for problems 2 and 3 - blue)_ - To set intermediate points, you must first check the **_Allow Stations_** checkbox. This would enable the _Station Node_ button. These are taken into consideration only in the _Traveling Salesman_ and _Multiple Stops_ algorithms. 
_Note: As long as there are Station Nodes on the grid, you can only run the two algos listed above._

* **Random Grid** - To randomly add _Walls_ in space.

* **Dropdowns** - _Speed_ to select the speed of visualization for problem 1, _Weight_ to set weight value of the Weight nodes.

* **Checkboxes** - _Show Unweighted_ to display the unweighted algorithm, i.e., _Breadth First Search_ in the Algorithm Panel on the right, _Allow Stations_ to enable the Station Node radio button.

* **Maximum Cost** - To input a value for the _Maximum Cost_ used in the _Multiple Stops_ algorithm. Should you choose to set no value, a default of 100 is considered as the maximum cost. 

* **Reset Graph** - To clear the traversals and path of the previous visualization.

* **Clear Graph** - To clear the Grid and set the _Start_ and _End_ nodes to default positions.

* **Tutorial - i** - A basic tutorial to using the web application.

* **Algorithm Panel** - Contains the algorithms listed above. _Allow Diagonal_ will enable diagonal traversal, _Dont Cross Corners_ will prevent the path from crossing the corners of _Wall Nodes_, _Bi-Directional_ allows the algorithm start searching from the start and end simultaneously and _Heuristic_ allows you to choose a heuristic function for algorithms that have the feature.


- Used Paper.js to build the Grid and for visualizations.

### Code Organization:
```
---- index.html     
---- assets     
         ---- DiagonalOptions.js        
         ---- EnableDisableStations.js      
         ---- block_generators.js       
         ---- draggable.js      
         ---- logo.png      
         ---- utilities.js      
---- finders        
         ---- AStar.js      
         ---- BiAStar.js        
         ---- BiBreadthFirstSearch.js       
         ---- BranchAndBound.js     
         ---- BreadthFirstSearch.js     
         ---- IDAStar.js        
         ---- IDDepthFirstSearch.js     
         ---- MultipleStops.js      
         ---- TravelingSalesman.js      
---- src        
         ---- App.js        
         ---- DataStructures.js     
         ---- Graph.js      
         ---- Grid.js       
         ---- Heuristic.js      
         ---- Node.js       
         ---- Path.js       
         ---- Runner.js     
         ---- States.js     
---- style      
         ---- css       
                 ---- main.css      
         ---- scss      
                 ---- main.scss     
```
