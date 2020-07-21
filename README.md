# Pirates On Mars

This is a path finding application that covers **three** path finding and optimization problems. Imagine you and your friends are on a spacecraft. You could be faced with all kinds of unprecedented problems like space debris, low fuel, and what not! We have modelled this application, keeping in mind such scenarios. The application allows you to _choose the locations of the source and destination_, set **obstacles** in space, and define difficult environments as **weighted** nodes for every problem. Before we understand the remaining features and functionalities, let's look at the three aforementioned problems:

1. Find the **_shortest_** path from Earth _(source)_ to Mars _(destination)_. You can define the state of the space using various features, choose an algorithm from the panel, set the visualization speed, select weights of all the weighted nodes, and click visualize to see the pathfinder build the path.

2. Traveling Salesman - Define **_intermediate stations_** and find the least cost path that starts from Earth _(source)_, covers all intermediate points _(stations)_, reaches Mars _(destination)_ at some point and returns to Earth.

3. Path optimization with a maximum cost constraint - Suppose your spacecraft is on a rescue mission. Every intermediate station is a **_space station_** and has someone who needs your help to escape. But alas, your craft has a limited amount of fuel, and you must reach Mars _(destination)_ before you run out. The _Multiple Stops_ algorithm tries to optimize at every point, so that with the available fuel, you can reach your destination, while saving as many people as you can, on your way there.

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

### Features:

**Walls** _(obstacles)_, **Weights** _(difficult regions to traverse)_, **Stations** _(intermediate points for problems 2 and 3)_, options to select speed and weight values _(how difficult it is to traverse a weighted region)_, and an **Algorithm Panel**. You can click the radio button to choose the desired node type _(drag enabled)_.