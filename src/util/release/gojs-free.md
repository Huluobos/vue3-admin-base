
### GoJS 说明

* 版本  

```
    v2.2.16
```

* 安装(安装后的脚本有水印，需要拉到本地破解)：

```
    pnpm i gojs -save 
```

* 将 node_modules/gojs/release 文件夹，复制到本地文件夹 例如:util/release

* vue3/vue2 引入

```
import gojs from './util/release/go-debug' //引入的是go-debug.mjs文件 
const app = createApp(App,{go:gojs})
```

### GoJS 去水印破解办法

> 搜索 createElement 找到这样的地方
    
```
 var a = sa.document.createElement("canvas"),
        b = a.getContext("2d"),
        c = Va("7ca11abfd022028846");
      b[c] = Va("398c3597c01238");
      for (
        var d = [
            "5da73c80a36455d6038e4972187c3cae51fd22",
            ta.Dx + "4ae6247590da4bb21c324ba3a84e385776",
            Jb.xF + "fb236cdfda5de14c134ba1a95a2d4c7cc6f93c1387",
            L.za,
          ],
          e = 1;
        5 > e;
        e++
      )
        b[Va("7ca11abfd7330390")](Va(d[e - 1]), 10, 15 * e);
      b[c] = Va("39f046ebb36e4b");
      for (c = 1; 5 > c; c++)
        b[Va("7ca11abfd7330390")](Va(d[c - 1]), 10, 15 * c);
      if (4 !== d.length || "5" !== d[0][0] || "7" !== d[3][0])
        Jb.prototype.Rd = Jb.prototype.Tw;
      Vk = a;
```

> 方法一 上面代码整体替换为：
 ```
      Vk = sa.document.createElement("canvas");
 ```


 ### 代码示例

 * vue文件

 ```
   <template>
    <div class="example">
        <div id="my-diagram-div"></div>
        <div></div>
    </div>
</template>
 
<script>
export default {
    name: "example",
    data() {
        return {};
    },
    mounted() {
        this.test();
    },
    methods: {
        
        test() {
            let $ = go.GraphObject.make; // for conciseness in defining templates
            let myDiagram = $(
                go.Diagram,
                "my-diagram-div", // id挂载dome节点
                {
                    allowDelete: false,
                    allowCopy: false,
                    layout: $(go.ForceDirectedLayout),
                    "undoManager.isEnabled": true,
                }
            );
            var colors = {
                'red': '#be4b15',
                'green': '#52ce60',
                'blue': '#6ea5f8',
                'lightred': '#fd8852',
                'lightblue': '#afd4fe',
                'lightgreen': '#b9e986',
                'pink': '#faadc1',
                'purple': '#d689ff',
                'orange': '#fdb400',
            }
            // the template for each attribute in a node's array of item data
            var itemTempl =
                $(go.Panel, "Horizontal",
                    $(go.Shape,
                        { desiredSize: new go.Size(15, 15), strokeJoin: "round", strokeWidth: 3, stroke: null, margin: 2 },
                        new go.Binding("figure", "figure"),
                        new go.Binding("fill", "color"),
                        new go.Binding("stroke", "color")),
                    $(go.TextBlock,
                        {
                            stroke: "#333333",
                            font: "bold 14px sans-serif"
                        },
                        new go.Binding("text", "name"))
                );
 
            // define the Node template, representing an entity
            myDiagram.nodeTemplate =
                $(go.Node, "Auto",  // the whole node panel
                    {
                        selectionAdorned: true,
                        resizable: true,
                        layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,
                        fromSpot: go.Spot.AllSides,
                        toSpot: go.Spot.AllSides,
                        isShadowed: true,
                        shadowOffset: new go.Point(3, 3),
                        shadowColor: "#C5C1AA"
                    },
                    new go.Binding("location", "location").makeTwoWay(),
                    // whenever the PanelExpanderButton changes the visible property of the "LIST" panel,
                    // clear out any desiredSize set by the ResizingTool.
                    new go.Binding("desiredSize", "visible", function (v) { return new go.Size(NaN, NaN); }).ofObject("LIST"),
                    // define the node's outer shape, which will surround the Table
                    $(go.Shape, "RoundedRectangle",
                        { fill: 'white', stroke: "#eeeeee", strokeWidth: 3 }),
                    $(go.Panel, "Table",
                        { margin: 8, stretch: go.GraphObject.Fill },
                        $(go.RowColumnDefinition, { row: 0, sizing: go.RowColumnDefinition.None }),
                        // the table header
                        $(go.TextBlock,
                            {
                                row: 0, alignment: go.Spot.Center,
                                margin: new go.Margin(0, 24, 0, 2),  // leave room for Button
                                font: "bold 16px sans-serif"
                            },
                            new go.Binding("text", "key")),
                        // the collapse/expand button
                        $("PanelExpanderButton", "LIST",  // the name of the element whose visibility this button toggles
                            { row: 0, alignment: go.Spot.TopRight }),
                        // the list of Panels, each showing an attribute
                        $(go.Panel, "Vertical",
                            {
                                name: "LIST",
                                row: 1,
                                padding: 3,
                                alignment: go.Spot.TopLeft,
                                defaultAlignment: go.Spot.Left,
                                stretch: go.GraphObject.Horizontal,
                                itemTemplate: itemTempl
                            },
                            new go.Binding("itemArray", "items"))
                    )  // end Table Panel
                );  // end Node
 
            // define the Link template, representing a relationship
            myDiagram.linkTemplate =
                $(go.Link,  // the whole link panel
                    {
                        selectionAdorned: true,
                        layerName: "Foreground",
                        reshapable: true,
                        routing: go.Link.AvoidsNodes,
                        corner: 5,
                        curve: go.Link.JumpOver
                    },
                    $(go.Shape,  // the link shape
                        { stroke: "#303B45", strokeWidth: 2.5 }),
                    $(go.TextBlock,  // the "from" label
                        {
                            textAlign: "center",
                            font: "bold 14px sans-serif",
                            stroke: "#1967B3",
                            segmentIndex: 0,
                            segmentOffset: new go.Point(NaN, NaN),
                            segmentOrientation: go.Link.OrientUpright
                        },
                        new go.Binding("text", "text")),
                    $(go.TextBlock,  // the "to" label
                        {
                            textAlign: "center",
                            font: "bold 14px sans-serif",
                            stroke: "#1967B3",
                            segmentIndex: -1,
                            segmentOffset: new go.Point(NaN, NaN),
                            segmentOrientation: go.Link.OrientUpright
                        },
                        new go.Binding("text", "toText"))
                );
 
            // create the model for the E-R diagram
            var nodeDataArray = [
                {
                    key: "Products",
                    items: [{ name: "ProductID", iskey: true, figure: "Decision", color: colors.red },
                    { name: "ProductName", iskey: false, figure: "Hexagon", color: colors.blue },
                    { name: "SupplierID", iskey: false, figure: "Decision", color: "purple" },
                    { name: "CategoryID", iskey: false, figure: "Decision", color: "purple" }]
                },
                {
                    key: "Suppliers",
                    items: [{ name: "SupplierID", iskey: true, figure: "Decision", color: colors.red },
                    { name: "CompanyName", iskey: false, figure: "Hexagon", color: colors.blue },
                    { name: "ContactName", iskey: false, figure: "Hexagon", color: colors.blue },
                    { name: "Address", iskey: false, figure: "Hexagon", color: colors.blue }]
                },
                {
                    key: "Categories",
                    items: [{ name: "CategoryID", iskey: true, figure: "Decision", color: colors.red },
                    { name: "CategoryName", iskey: false, figure: "Hexagon", color: colors.blue },
                    { name: "Description", iskey: false, figure: "Hexagon", color: colors.blue },
                    { name: "Picture", iskey: false, figure: "TriangleUp", color: colors.pink }]
                },
                {
                    key: "Order Details",
                    items: [{ name: "OrderID", iskey: true, figure: "Decision", color: colors.red },
                    { name: "ProductID", iskey: true, figure: "Decision", color: colors.red },
                    { name: "UnitPrice", iskey: false, figure: "Circle", color: colors.green },
                    { name: "Quantity", iskey: false, figure: "Circle", color: colors.green },
                    { name: "Discount", iskey: false, figure: "Circle", color: colors.green }]
                },
            ];
            var linkDataArray = [
                { from: "Products", to: "Suppliers", text: "0..N", toText: "1" },
                { from: "Products", to: "Categories", text: "0..N", toText: "1" },
                { from: "Order Details", to: "Products", text: "0..N", toText: "1" }
            ];
            myDiagram.model = $(go.GraphLinksModel,
                {
                    copiesArrays: true,
                    copiesArrayObjects: true,
                    nodeDataArray: nodeDataArray,
                    linkDataArray: linkDataArray
                });
        }
    },
};
</script>
 
<style scoped>
#my-diagram-div {
    width: 1000px;
    height: 800px;
}
</style>

 ```