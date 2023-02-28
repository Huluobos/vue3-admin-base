<template>
    <div class="example">
        <div id="myDiagramDiv" style="width:600px;height:200px;"></div>
    </div>
</template>

<script>
import { nodeDataArray } from './gomap.js'
export default {
    name: "example",
    data() {
        return {

        };
    },
    mounted() {
        this.init(nodeDataArray)
    },
    methods: {
        init(nodeDataArray) {
            if (window.goSamples) goSamples(); 
            var $ = go.GraphObject.make
            let diagram = $(go.Diagram, "myDiagramDiv");
            diagram.nodeTemplate =
                $(go.Node, "Auto",
                    new go.Binding("location", "loc", go.Point.parse),
                    $(go.Shape, "Ellipse", { fill: "white" }),
                    $(go.TextBlock,
                        new go.Binding("text", "key"))
                );
            diagram.linkTemplate =
                $(go.Link,
                    { routing: go.Link.Orthogonal, corner: 5 },
                    $(go.Shape));
                    // 处理json数据
            var nodeObj = JSON.parse(JSON.stringify(nodeDataArray))
            diagram.model = new go.TreeModel(nodeObj);
        },
    },
};
</script>
 
<style scoped>
#myDiagramDiv {
	background-color: #F8F8F8;
	border: 1px solid #aaa;
}
</style>