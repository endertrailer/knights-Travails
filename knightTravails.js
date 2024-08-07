function knightTravails(coords1, coords2) {
    let graph = [];
    for (let i = 0; i < 8; i++) {
      graph[i] = [];
      for (let j = 0; j < 8; j++) {
        graph[i][j] = createEdge([i, j]);
      }
    }
    function createEdge(coords) {
      let edges = [];
      let x = coords[0];
      let y = coords[1];
      if (x + 1 <= 7 && y + 2 <= 7) {
        edges.push([x + 1, y + 2]);
      }
      if (x + 2 <= 7 && y + 1 <= 7) {
        edges.push([x + 2, y + 1]);
      }
      if (x + 2 <= 7 && y - 1 >= 0) {
        edges.push([x + 2, y - 1]);
      }
      if (x + 1 <= 7 && y - 2 >= 0) {
        edges.push([x + 1, y - 2]);
      }
      if (x - 1 >= 0 && y - 2 >= 0) {
        edges.push([x - 1, y - 2]);
      }
      if (x - 2 >= 0 && y - 1 >= 0) {
        edges.push([x - 2, y - 1]);
      }
      if (x - 2 >= 0 && y + 1 <= 7) {
        edges.push([x - 2, y + 1]);
      }
      if (x - 1 >= 0 && y + 2 <= 7) {
        edges.push([x - 1, y + 2]);
      }
      return edges;
    }
  
    let distanceGraph = [];
    for (let i = 0; i < 8; i++) {
      distanceGraph[i] = [];
      for (let j = 0; j < 8; j++) {
        distanceGraph[i][j] = { path: [], distance: Infinity };
      }
    }
    distanceGraph[coords1[0]][coords1[1]].distance = 0;
    distanceGraph[coords1[0]][coords1[1]].path = [coords1];
  
    function findPath() {
      function levelOrder() {
        let queue = [coords1];
        let values = [];
        while (queue) {
          if (queue.length === 0) {
            break;
          }
          graph[queue[0][0]][queue[0][1]].forEach((element) => {
            if (!checkValues(values, element) && !checkValues(queue, element)) {
              queue.push(element);
              distanceGraph[element[0]][element[1]].path = [
                ...distanceGraph[queue[0][0]][queue[0][1]].path,
              ];
              distanceGraph[element[0]][element[1]].path.push(element);
              distanceGraph[element[0]][element[1]].distance =
                distanceGraph[queue[0][0]][queue[0][1]].distance + 1;
            }
          });
  
          values.push(queue[0]);
          queue = queue.slice(1);
        }
        console.log(distanceGraph[coords2[0]][coords2[1]]);
        return values;
      }
      function checkValues(array, values) {
        for (let i = 0; i < array.length; i++) {
          if (array[i][0] === values[0] && array[i][1] === values[1]) {
            return true;
          }
        }
        return false;
      }
      levelOrder();
    }
    findPath();
  }
  
  knightTravails([7, 7], [7, 6]);
  