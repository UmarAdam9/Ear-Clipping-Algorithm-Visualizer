# Polygon-Triangulation-Algorithm-Visualizer
Ear-Clipping polygon triangulation visualizer written in JavaScript


![image](https://github.com/user-attachments/assets/398b27cb-bb60-4fba-97bd-9ca1d09efcaa)





Left clicking on the screen creates a vertex.

Press enter after placing the vertices to fill the polygon with triangles.

============# Important Notes #==================

The shapes you create must have an anticlockwise winding order otherwise the algorithm will not work properly.

Sometimes you might double click a point and create two vertices at the exact same position- this will also cause the algorithm to break.
To mitigate this problem , i've added a vertex counter on the top right, make sure that the vertex counter is equal to the number of distinct vertices on the canvas and you should be good.

Thats it!


