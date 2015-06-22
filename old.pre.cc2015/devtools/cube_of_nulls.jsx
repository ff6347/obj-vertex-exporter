main();
function main(){
var curComp = app.project.activeItem;
if (!curComp || !(curComp instanceof CompItem)){
    alert("noComp");
    return;
};

var min_x = 0;
var min_y = 0;
var min_z = 0;
var max_x = curComp.width;
var max_y = curComp.height;
var max_z = 500;
var xr = 0;
var yr = 0;
var zr = 0;

for(var z = min_z;z < max_z; z = z + 100){
    xr++;
        for(var y = min_y;y < max_y; y = y + 100){
            yr++;
                for(var x = min_x;x < max_x; x = x + 100){
                    zr++;
                       var nullLayer = curComp.layers.addNull();
//~                        nullLayer.comment = "*x"+xr+",*y"+yr+",*z"+zr;
                       nullLayer.threeDLayer = true;
                       
                        nullLayer.transform.position.setValue([x,y,z]);
                        nullLayer.transform.position.expression = "wiggle(0.5,time)";
            }
    }
}
}