Introduction
============

This tutorial covers different types of state management.

Save State / Load State
-----------------------

ParaView state files are saved by selecting the menu option File → Save
State. The pipeline, orientation of the data set, and all view windows
are saved. Select File → Load State to open a saved ParaView state file.

Save Data
---------

This feature will save the data output from the selected source/filter.
The Save Data feature is selected from the main menu: File → Save Data.
The data type is whatever you chose when you save the data. If a data
type is missing, it probably means you are trying to output data that is
not supported by this dataset format. For example, you need to have
surface data, as trianges, to output .stl files.

:   Save Data can be used to create .csv files of your data. .csv files
    can be read into spreadsheets and other programs.
:   Save Data can be used to create .stl files. .stl files are often
    used for additive manufacturing, or animation programs. Run filters
    **Extract Surface** then **Triangulate** before Saving Data.
:   Save Data can be used to create files Houdini can ingest. These are
    .geo files. Again, run filters **Extract Surface** then
    **Triangulate** before Saving Data.

Export Scene
------------

This feature will save whatever is in the viewport to a file. The Export
Scene feature is selected from the main menu: File → Export Scene.
Again, the data type is whatever you chose when you export scene.

:   Export Scene can be used to create .webgl files of what is displayed
    in the viewport. A .html file will be written out, which you can
    load in a web browser. This format allows users to create
    interactive data products that anyone can load in a web browser.
:   Export Scene can be used to create .pdf files of what is displayed
    in the viewport.

Traces
------

ParaView can now automatically save traces, or macros. This means that
you can start recording a trace, do something, stop recording a trace,
and save this trace into a file. You can then use this trace file as
input to the pvbatch program, or as a macro within ParaView.

Example:

-   Start ParaView
-   Tools/ Python Shell/ Trace/ Start Trace.
-   Open disk\_out\_ref.exo, all variables on, Apply.
-   Clip, Z normal, unselect show plane, Apply.
-   Slice, unselect show plane, Apply.
-   Color by Temp.
-   In the Python Shell window, Stop Trace.
-   Save trace. Save as macro. Call it **Super-disk**.
-   Edit/ Delete All

Now, lets run the trace.

-   On the Macros toolbar, you will see Super-disk. Click it.

Acknowledgements
================

Sandia National Laboratories is a multi-mission laboratory managed and
operated by National Technology and Engineering Solutions of Sandia,
LLC., a wholly owned subsidiary of Honeywell International, Inc., for
the U.S. Department of Energy's National Nuclear Security Administration
under contract DE-NA-0003525.
