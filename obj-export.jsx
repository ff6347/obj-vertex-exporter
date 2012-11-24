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

/**
 * First of all.
 * Satya G Meka aka Rowbyte is the only one out of
 * Element 3D, Form and Plexus
 * who seems to get the obj import right
 * I didn't try the atomkraft plugins.
 * Element 3D and Form fail with the OBJ files created
 * E3D needs faces to import an obj and then the scale.
 * Its pretty wired.
 * Form does also not get the AE world right back in.
 * No offense I love E3D and Form but
 * Plexus eats these OBJ files out of the box.
 *
 * But hey. Still have fun with that script.
 */


/**
 * Videocopilot Element 3D Quirks:  
 * - E3D needs faces in the obj. If there are only verticies he does not find anything at all
 * - E3D seems to read only positive values
 * - E3D scaleing is offseted
 * - E3D position is offseted
 * - E3D writing all v's to faces does not solve the problem so it is deactivated
 * 
 */


/**
 * Trapcode Form Quirks:  
 * - Form needs no faces. He finds the verticies
 * - better shut of normalize
 * - To get something that is near to but not fully right
 *   Set the Basefrom x to your obj comps x
 *   Set the Basefrom y to your obj comps y
 *   Set the Basefrom z to your obj comps z
 *   But still. It is not fully right.
 *   Fiddle with the z offset
 *   you need to offset the center z of the Base Form
 * 
 */

/**
 * Blender does not like my files either.
 * 
 */
// ------------------------
        run_script(this);
// ------------------------

function run_script(thisObj){
    var objex = new Object();
    objex.settings = {
      sequence : false,
      /**
       * This is a poor attempt to write faces
       * You cant reach this via UI
       */
      writefaces : false 
    };
    objex.helpString = [];
    objex.helpString.push("obj-export.jsx");
   objex.helpString.push("is a simple oneshot script that takes the positions of all selected layers and writes obj verticies from it. It works out of the box with Plexus by Rowbyte.");
    objex.helpString.push("/**\
 * Plexus is the only one out of\
 * Element 3D, Form and Plexus\
 * who seems to get the obj import right.\
 * I didn't try the atomkraft plugins nor others.\
 * Element 3D and Form get problems with the OBJ files created\
 * E3D needs faces to import an obj and seems to have problem with negative Z values.\
 * Its pretty wired. So I disabled that for the moment.\
 * Form also does not get the world right.\
 * No offense I love E3D and Form but\
 * Plexus eats these OBJ files out of the box.\
 *\
 * But hey. You still can have fun with this script.\
 */");
 

objex.helpString.push("/**\
 * Trapcode Form Quirks:  \
 * - Form needs no faces. He finds the verticies\
 * - better shut of normalize\
 * - To get something that is near to but not fully right\
 *   Set the Basefrom x to your obj comps x\
 *   Set the Basefrom y to your obj comps y\
 *   Set the Basefrom z to your obj comps z\
 *   But still. It is not fully right.\
 *   Fiddle with the z offset\
 *   you need to offset the center z of the Base Form\
 * \
 */");

objex.helpString.push("/**\
 * Videocopilot Element 3D Quirks:  \
 * - E3D needs faces in the obj. If there are only verticies he does not find anything at all\
 * - E3D seems to read only positive values\
 * - E3D scaleing is offseted\
 * - E3D position is offseted\
 * - E3D writing all v's to faces does not solve the problem so it is deactivated\
 * \
 */");

objex.helpString.push("Btw: Blender does not like these files either. ;(");



    var errorStrings = new Object();
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

        win.sequence_check = win.add('checkbox',[x,y,x+W1*2,y + H],'seq')
        win.export_button = win.add('button', [x + W1*2 -G*2,y,x+W1*5,y + H], 'export');
        win.help_button = win.add('button', [x + W1*5+ G,y,x + W1*6,y + H], '?'); 

        win.help_button.onClick = function () {
          alert(objex.helpString.join("\n"));
        }
        win.export_button.onClick = function(){
          export_obj(objex);
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
function export_obj(objex){

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

var coords = new Array();

var selection = curComp.selectedLayers;

if(objex.settings.sequence == false){



for(var j in selection){

var sel = selection[j];

coords.push(get_position(sel));

  }

var newLocation = Folder.selectDialog("Select a output folder...");
    var timestamp = Number(new Date());

  var fn =  curComp.name +" "+ timestamp;// prompt("Enter target file name","myObjFile");
  var tf = newLocation.fsName;
  var txtFile =  new File( tf+"/" + fn + ".obj" ); 


writeArray(txtFile, coords, curComp.name + "" );

alert("wrote: " + fn + ".obj\nto folder: " + tf);
}else{

  alert("This should write a sequence");

}
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

    var res = checkOSSave(); 
      if((res[0] == true)&&(res[1]== false)){
      txtFile.lineFeed = "Windows"; //convert to Windows linefeed
      }else if((res[0] == false)&&(res[1]== true)){
      txtFile.lineFeed = "Unix"; //convert to UNIX linefeed
      }else{
      alert("I cant determine your OS.\nI will use Unix linefeeds.");
      txtFile.lineFeed = "Unix"; //convert to UNIX linefeed
      }



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

     // this is not reachable by UI
     // 
    if(objex.settings.writefaces == true){
     // not fit for E3D
     var e3dface_str = "f ";
      for(var j =0; j < arr.length;j++){
       e3dface_str+= " " + String(j+1);
      }
      txtFile.writeln(e3dface_str);
    };

      txtFile.close();   
     // txtFile.execute();  
   }
};

// found here 
// http://stackoverflow.com/questions/9223701/math-round-adding-leading-zeros

function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }

    return str;
}


function checkOS(){
  var os_string = $.os;
  var os_char = os_string.charAt(0);
  var bool = null;
  if (os_char == "w" || os_char == "W") {
    bool = true;
  }
  else {
    bool = false;
  }
return bool;
}

function checkOSSave(){ 
    var os_w = null;
    var os_m = null;
    os_w = ($.os.search(/windows/i) != -1) ? true : false;
    os_m = ($.os.search(/macintosh/i) != -1) ? true : false;
    return [os_w,os_m];
} 

function sortfunc(a,b){
return a - b;
};

function writeData (txtFile , aData ){  
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
}
};