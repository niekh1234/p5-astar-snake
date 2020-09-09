// I would've called it Node but apparantly that is some kind of DOM thing.
class INode {
    constructor(_x, _y, _gCost, _hCost, _fCost, _visited, _obstruction, _parent) {
        this.x = _x;
        this.y = _y;
        this.gCost = _gCost;
        this.hCost = _hCost;
        this.fCost = _fCost;
        this.visited = _visited;
        this.obstruction = _obstruction;
        this.parent = _parent;
    }
}