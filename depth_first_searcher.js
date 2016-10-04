// Write code that can search for a node in a tree.
// Return the node if it exists, and null/nil/none/undefined/false as appropriate in your language if not.
// For example, if the code is given "g" and a tree with the structure above,
// it should return the node named "g".

var module = module || {};
module.exports || (module.exports = {});

// Define modules.
(function (exports) {

  'use strict';

  /**
   * A node class.
   *
   * @param name node name
   * @constructor
   */
  let Node = function (name) {
    this.name = name;
    this.connections = null;
  };

  /**
   * Connect nodes to the node.
   *
   * @param ...args nodes
   */
  Node.prototype.connect = function () {
    if (arguments.length === 0) return false;
    if (this.connections === null) this.connections = [];
    let newConnections = Array.prototype.slice.call(arguments).filter((argument) => {
      return argument instanceof Node && this.connections.indexOf(argument) === -1 && argument !== this;
    });
    this.connections = this.connections.concat(newConnections);
  };

  /**
   * Depth first search.
   *
   * @param name search name
   * @param visitedNodes visited nodes
   * @returns {*} Node instance if found or otherwise false
   */
  Node.prototype.depthFirstSearch = function (name, visitedNodes = []) {
    if (visitedNodes.indexOf(this) === -1) visitedNodes.push(this);
    if (this.name === name) return this;
    for (var i = 0, l = this.connections ? this.connections.length : 0; i < l; i++) {
      if (visitedNodes.indexOf(this.connections[i]) === -1) {
        let foundNode = this.connections[i].depthFirstSearch(name, visitedNodes);
        if (foundNode !== false) {
          return foundNode;
        }
      }
    }

    return false;
  };

  /**
   * return only name.
   *
   * @returns string name
   */
  Node.prototype.toString = function () {
    return this.name;
  };

  exports.Node = Node;

})(module.exports);


// Run tests.
(function (exports) {

  // alias modules.
  let Node = exports.Node;

  //     a
  //    /|\ /\
  //   b | cー
  //  /|\|  \
  // d e f   g
  //         |
  //         h
  let nodeA = new Node('a');
  let nodeB = new Node('b');
  let nodeC = new Node('c');
  let nodeD = new Node('d');
  let nodeE = new Node('e');
  let nodeF = new Node('f');
  let nodeG = new Node('g');
  let nodeH = new Node('h');
  nodeA.connect(nodeB, nodeC);
  nodeB.connect(nodeD, nodeE, nodeF);
  nodeC.connect(nodeG);
  nodeG.connect(nodeH);
  nodeF.connect(nodeA);
  nodeC.connect(nodeC);

  // search g, which is expected to find a "g" node.
  console.log("search 'g': ", nodeA.depthFirstSearch('g').toString());

  // search i, which is expected to be false.
  console.log("search 'i': ", nodeA.depthFirstSearch('i').toString());

})(module.exports);