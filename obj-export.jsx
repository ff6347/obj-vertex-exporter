{


// Copyright (c)  2012 
// Fabian "fabiantheblind" Morón Zirfas  
// Permission is hereby granted, free of charge, to any 
// person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software
// without restriction, including without limitation the rights 
// to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to  permit persons to 
// whom the Software is furnished to do so, subject to 
// the following conditions:  
// The above copyright notice and this permission notice
// shall be included in all copies or substantial portions of the Software.  
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF  CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTIO
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.  

// see also http://www.opensource.org/licenses/mit-license.php


// ------------------------
        run_script(this);
// ------------------------

function run_script(thisObj){
    var objex = new Object();
    objex.settings = {
    };


    var errorStrings;
    var uiStrings = new Object();
    // uiStrings.markerType = ["none","Null Object","Light Layer","Text Layer","Solid"];



    ///   THIS WILL CHECK IF PANEL IS DOCKABLE OR FLAOTING WINDOW  
    var win   = buildUI(thisObj , objex ,errorStrings, uiStrings);
    if ((win != null) && (win instanceof Window)) {
        win.center();
        win.show();
    }; // end if win  null and not a instance of window 


};// close run_script


function buildUI (thisObj , objex ,errorStrings, uiStrings) {
    var win = (thisObj instanceof Panel) ? thisObj :  new Window('palette', 'obj-export',[0,0,150,260],{resizeable: true}); 

    if (win != null) {

        var H = 25;
        var W1 = 30;
        var G = 5;
        var x = G;
        var y = G;
        var yuioff = G;

        win.export_button = win.add('button', [x,y,x+W1*3,y + H], 'export'); 
        win.help_button = win.add('button', [x + W1*3+G,y,x + W1*4,y + H], '?'); 

        win.help_button.onClick = function () {
          alert(this.text);
        }
        win.export_button.onClick = function(){
          export_obj();
        };


    }
    return win
};// end buildUI



// ------------------------------------------------------------

    //  ______ _   _ _____   ____  ______ _    _ _____ 
    // |  ____| \ | |  __ \ / __ \|  ____| |  | |_   _|
    // | |__  |  \| | |  | | |  | | |__  | |  | | | |  
    // |  __| | . ` | |  | | |  | |  __| | |  | | | |  
    // | |____| |\  | |__| | |__| | |    | |__| |_| |_ 
    // |______|_| \_|_____/ \____/|_|     \____/|_____|


// ------------------------------------------------------------


// main();
function export_obj(){

  app.beginUndoGroup("export obj");


var curComp = app.project.activeItem;
   if (!curComp || !(curComp instanceof CompItem)){
        alert("noComp");
        return;
    };

if ((curComp.selectedLayers.length < 1)){
        alert("Please select only one center layer");
        return;
    }


// var name = prompt("Enter a name.\nLeave empty for marker coords","");
var cw = curComp.width;
var ch = curComp.height;

var list = new Array();

// var doc = app.activeDocument;
// var str = "";
var coords = new Array();


// var ab = doc.artboards[0];
// ab.rulerOrigin = [0 , 0]; 

var selection = curComp.selectedLayers;


for(var j in selection){

var sel = selection[j];

coords.push(get_position(sel));

// for(var i = 0; i < sel.pathPoints.length;i++){
// if(sel.threeDLayer==false){
//   var x = sel.transform.position.value[0].toFixed(3);
//   var y = sel.transform.position.value[1].toFixed(3);
//   var z = 0.0;
//   // str = "" + (sel.transform.position.value[0].toFixed(3)) +" " +(sel.transform.position.value[1].toFixed(3)) + " 0.0\r\n";
//   coords.push("" + x +" " + y + " "+ z);

// }else{
//     coords.push("" +
//       (sel.transform.position.value[0].toFixed(3)) +" "+
//       (sel.transform.position.value[1].toFixed(3)) + " "+
//       (sel.transform.position.value[2].toFixed(3))
//       );

// }


    // list.push(sel.pathPoints[0].value);
    // }
  }

var newLocation = Folder.selectDialog("Select a output folder...");
    var timestamp = Number(new Date());

  var fn =  curComp.name +" "+ timestamp;// prompt("Enter target file name","myObjFile");
  var tf = newLocation.fsName;
  var txtFile =  new File( tf+"/" + fn + ".obj" ); 

// alert(list);

writeArray(txtFile, coords, curComp.name + "" );
// writeData (txtFile , str  );
    alert("wrote: " + fn + ".obj\nto folder: " + tf);

app.endUndoGroup();
}


function get_position(layer){
// var str = "";
var x = 0.0;
var y = 0.0;
var z = 0.0;

  x = layer.transform.position.value[0].toFixed(3) - (layer.containingComp.width/2);
  y = layer.transform.position.value[1].toFixed(3) - (layer.containingComp.height/2);
  if(layer.threeDLayer) {
    z = layer.transform.position.value[2].toFixed(3);
  }else{
    z = 0.0;
  };

return "" + x +" " + y + " "+ z;
};

    function writeArray (txtFile , arr ,grName)  
{  
  var out;
   if( txtFile!='' )  
   {   
      //Open the file for writing.   
      out = txtFile.open( 'e', undefined, undefined );
      txtFile.encoding = "UTF-8";
      txtFile.lineFeed = "Unix"; //convert to UNIX linefeed
        var openString = "# WaveFront *.obj file generated by Adobe After Effects\n"+
                          "# with obj-export.jsx\n\n";
    // var groupName = "g " + grName;
    // txtFile.writeln(openString );

    arr.sort(sortfunc); //must sort vertices to get rid of errant vertex at the end
   }  
   if( out != false )  
   {     
     for(var i in arr){

      txtFile.writeln("v " + arr[i] );
     }
     var e3dface_str = "f ";
     for(var j =0; j < arr.length;j++){
      e3dface_str+= " " + String(j+1);
     }
      txtFile.writeln(e3dface_str);
      txtFile.close();   
     // txtFile.execute();  
   }
}

function sortfunc(a,b)
{
return a - b;
}

    function writeData (txtFile , aData )  
{  
  var out;
   if( txtFile!='' )  
   {   
      //Open the file for writing.   
      out = txtFile.open( 'e', undefined, undefined );   
   }  
   if( out != false )  
   {     
     txtFile.seek(0);
      txtFile.writeln( aData );         
      txtFile.close();   
     // txtFile.execute();  
   }
}}