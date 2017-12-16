var HuffmanCompression = (function(){
    /**
     * Returns the unique characters of the input string and its count
     * @param inputStr
     * @returns {{}}
     */
    function _generateCharMap(inputStr) {
        var ctrMap = { };
        for(var i=0; i<inputStr.length; i++) {
            var char = inputStr[i];
            if(!ctrMap[char]) {
                ctrMap[char] = 0;
            }
            ++ctrMap[char];
        }
        return ctrMap;
    }

    function _generateCodingNodes(inputMap) {
        return Object.keys(inputMap).map(function(key){
            return {
                text : key,
                count : inputMap[key],
                left : null,
                right:  null
            };
        });
    }

    function _generateCodingTree(inputMap) {
        var nodes = _generateCodingNodes(inputMap)
            .sort(function(node1, node2){
                return node1.count - node2.count;
            });

        while(true) {
            var node1 = nodes.splice(0,1)[0];
            var node2 = nodes.splice(0,1)[0];
            var newNode = _mergeNodes(node1, node2);

            var insertAt = 0;
            for(var i=0; i<nodes.length; i++) {
                if(nodes[i].count >= newNode.count) {
                    insertAt = i;
                    break;
                }
            }
            nodes.splice(insertAt, 0, newNode);

            if(nodes.length === 1) {
                break;
            }
        }

        return nodes[0];
    }

    function _generateCodingTable(rootNode) {
        var result = [];
        _reduceTree(rootNode, '', result);
        return result;
    }

    function _mergeNodes(node1, node2) {
        return {
            count : node1.count + node2.count,
            text : null,
            left : node1,
            right : node2
        };
    }

    function _reduceTree(node, code, accumulator) {
        if(node.left === null && node.right === null) {
            accumulator.push({
                code : code,
                text : node.text
            });
            return;
        }

        //-- Reduce Left
        _reduceTree(node.left, code+'0', accumulator);

        //-- Reduce Right
        _reduceTree(node.right, code+'1', accumulator);
    }


    function compress(inputStr) {
        var charMap = _generateCharMap(inputStr);
        var rootNode = _generateCodingTree(charMap);

        return _generateCodingTable(rootNode);
    }

    return {
        compress : compress
    }
})();

/** INFO **/console.info('>>>>>>>>>>>>>>>>>>>>>>>');
/** INFO **/console.info(HuffmanCompression.compress(input));


