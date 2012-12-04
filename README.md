#obj-vertex-export.jsx  
This script exports obj files from AE 3D layer positions. It only exports vertex points. No faces or other features of .obj.  
##Download  
You can download the script @aescripts.com  

##Installation  
You can run this script as dockable or floating panel. Read this part of the [AEHelp](http://help.adobe.com/en_US/aftereffects/cs/using/WSD2616887-A41E-4a39-85FE-957B9D2D3843.html) or watch [this tutorial on aescripts.com](http://aescripts.com/knowledgebase/index/view/faq/how-to-install-and-run-scripts/).
##Usage  
Select at least one layer. If the "seq" checkbox is deselected the script will export the current position(s) of the selected layer(s) at the current time.  
If you check the "seq" checkbox the script will export the position(s) of the selected layer(s) for the whole workarea. Expressions will be calculated and parented layers also work right.  

##Compatibility of the .obj files
The .obj files work out of the box with Plexus. Trapcode From can read these files but the 3D space does not match with the AE 3D space. VC Element 3D can't read these files. Element needs faces to read .obj files.  

####Trapcode Form Quirks:  
- Form needs no faces. He finds the verticies
- better shut of normalize
- To get something that is near to but not fully right
Set the Basefrom x to your obj comps x  
Set the Basefrom y to your obj comps y  
Set the Basefrom z to your obj comps z  
But still. It is not fully right.  
Fiddle with the z offset  
you need to offset the center z of the Base Form  

####Videocopilot Element 3D Quirks:  
- E3D needs faces in the obj. If there are only verticies he does not find anything at all
 - E3D seems to read only positive values
 - E3D scaleing is offseted
 - E3D position is offseted
 - E3D writing all v's to faces does not solve the problem so it is deactivated. The function that does that is also ultra dumb. It just lines up all verticies and adds them to one single face.  

####Other 3D applications  
- Blender can import these files, but I have no experience with Blender. So I can't tell you how it is right to import or so. I managed to import the obj as pointcloud.
- This is not tested in any other 3D application. So feel free to report what works and what not.  

##License  
Copyright (c)  2012 Fabian "fabiantheblind" Morón Zirfas  
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software  without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to  permit persons to whom the Software is furnished to do so, subject to the following conditions:  
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.  
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A  PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF  CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.  

see also http://www.opensource.org/licenses/mit-license.php

