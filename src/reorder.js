export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex,1);
    result.splice(endIndex,0,removed);

    return result
};

export const reorderColumnMap = (columnMap, source, destination) => {
    const current = [...columnMap[source.droppableId].pokemon];
    const next = [...columnMap[destination.droppableId].pokemon];
    const target = current[source.index];

    // if nothing changes
    if (source.droppableId === destination.droppableId && source.index === destination.index) {return {reorderedMap: columnMap, columnsChanged:[]};}

    // TEAM IS FULL! 
    if (next.length===5){return {reorderedMap: columnMap, columnsChanged:[]};}

    // moving to same list
    if (source.droppableId === destination.droppableId) {
        const reordered = reorder(current, source.index, destination.index);
        let output = {reorderedMap: {
            ...columnMap,
            
        },
        columnsChanged: [source.droppableId]
        };
        output.reorderedMap[source.droppableId].pokemon =  reordered
        return output
    };

    current.splice(source.index, 1);
    next.splice(destination.index, 0, target);

    let output = {reorderedMap: {
        ...columnMap,
    },
    columnsChanged: [source.droppableId, destination.droppableId]
    }; 
    output.reorderedMap[source.droppableId].pokemon =  current;
    output.reorderedMap[destination.droppableId].pokemon =  next;
    return output
};