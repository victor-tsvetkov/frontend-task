class StoreTree {

    items = []

    constructor(items) {
        this.items = items;
    }

    getAll() {
        return this.items;
    }

    getItem(id) {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            return this.items[index];
        }
    }

    getChildren(id) {
        return this.items.filter(item => item.parent === id);
    }

    getAllChildren(id) {
        let children = this.getChildren(id);
        let result = [...children];
        while (children.length > 0) {
            let temp = [];
            for (let i = 0; i < children.length; i++) {
                let subChildren = this.getChildren(children[i].id);
                temp = [...temp, ...subChildren];
            }
            children = [...temp];
            result = [...result, ...children];
        }
        return result;
    }

    getAllParents(id) {
        const element = this.getItem(id);
        let result = [element];
        let parent = element.parent;
        while (parent !== 'root') {
            const subParent = this.getItem(parent);
            result = [...result, subParent];
            parent = subParent.parent;
        }
        return result;
    }

}


const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },

    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];

const storeTree = new StoreTree(items);
console.log(storeTree.getAllChildren(1));
console.log(storeTree.getAllParents(1));
console.log(storeTree.getItem(3));
console.log(storeTree.getAll());
console.log(storeTree.getChildren(5));