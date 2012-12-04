#obj-export.jsx  
This script exports obj files from AE 3D layer positions. It only exports vertex points. No faces or other features of .obj.  
##Download  
##Installation  
You can run this script as dockable or floating panel. Read this part of the [AEHelp](http://help.adobe.com/en_US/aftereffects/cs/using/WSD2616887-A41E-4a39-85FE-957B9D2D3843.html) or watch [this tutorial on aescripts.com](http://aescripts.com/knowledgebase/index/view/faq/how-to-install-and-run-scripts/).
##Usage  
Select at least one layer. If the "seq" checkbox is deselected the script will export the current position(s) of the selected layer(s) at the current time. If you check the "seq" checkbox the script will export the the position(s) of the selected layer(s) for the whole workarea.  

##Compatibility of the .obj files
The .obj files work out of the box with Plexus. Trapcode From can read these files but the 3D space does not match with the AE 3D space. VC Element 3D can't read this file. Blender can't read this file.  

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
 - E3D writing all v's to faces does not solve the problem so it is deactivated

####Blender  
Can import these files, but I have no expirience with Blender. So I can't tell you how it is right.  

##License  