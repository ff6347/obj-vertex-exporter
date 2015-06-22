  // Write WAVEFRONT OBJ files to disk
  // - single frame or sequence
  // - vertex only!
  //
  //
  // Copyright (c)  2012 - 2015
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
   *
   * First of all.
   * Satya G Meka aka Rowbyte is the only one out of
   * Element 3D, Form and Plexus
   * who seems to get the obj import right
   * I didn't try the atomkraft plugins.
   * Element 3D and Form fail with the OBJ files created
   * E3D needs faces to import an obj and then the scale is strange.
   * Its pretty wired.
   * Form does also not get the AE world right back in.
   * No offense I love E3D and Form but
   * Plexus eats these OBJ files out of the box.
   *
   * But hey. Still have fun with that script.
   *
   *
   *
   * Videocopilot Element 3D Quirks:
   * - E3D needs faces in the obj. If there are only verticies he does not find anything at all
   * - E3D seems to read only positive values
   * - E3D scaleing is offseted
   * - E3D position is offseted
   * - E3D writing all v's to faces does not solve the problem so it is deactivated
   *
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
   * @todo calculate also rotation values und scales using a buffer layer with this expression
   * // apply to position of buffer layer
   * // works 2D and 3D
   * a = thisComp.layer("parented layer");
   * a.toWorld(a.anchorPoint);
   *
   */
