interface Item {
    id: any,
    parent: any,
    type: string
}

interface Array<T> {
    find(predicate: (search: T) => boolean) : T;
}


class StoreTree {

    private readonly items: Array<Item>;

    constructor(items: Array<Item>) {
        this.items = items;
    }

    public getAll(): Array<Item> {
        return this.items;
    }

    public getItem(id): Item {
        const item = this.items.find(item => item.id === id);
        if (!!item) {
            return item;
        }
    }

    public getChildren(id: any): Array<Item> {
        return this.items.filter(item => item.parent === id);
    }

    public getAllChildren(id: any) {
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

    public getAllParents(id: any) {
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