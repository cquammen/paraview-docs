Introduction
============

ParaView can run without opening the ParaView GUI, and is controlled
through Python. There are two Python interfaces - PvPython and PvBatch.

PvPython
========

PvPython is the Python intreface to ParaView. You can think of PvPython
as ParaView with a Python interface. As we did with the Python Shell,
you can manually type in commands to pvpython . PvPython can also read
Python command files. For instance,

:   **fullPathToPvPython/pvpython
    fullPathToPythonCommandFile/commandFile.py**

<!-- -->

:   \'\'\'d:\\alan\\paraview\\pvpython
    d:\\alan\\scripts\\disk\_out\_ref-A.py

-   You will notice that pvpython will run the script and then exit. The
    output of the script is a screenshot or or other data product.
-   Anywhere that needs editing in the scripts above will be marked by
    the string **editMeHere**.
-   You will need to hard code in the paths to your data, and paths for
    output products.
-   The first time you run a script with pvpython, the output will be a
    postage stamp sized window. You can change this by finding and
    uncommenting the line **renderView1.ViewSize**.

:   Try making and running a script of your own. Alternatively, try
    running the scripts available on the ParaView and Python wiki page.

PvBatch
=======

PvBatch is like PvPython, with two exceptions. PvBatch only accepts
commands from input scripts, and PvBatch will run in parallel if it was
built using MPI. Input is exactly like PvPython.

Generic user specific section
-----------------------------

### This section describes how to use pvbatch when in the ParaView training class on Windows PCs.

-   If you are training on Linux, pvbatch will exist in the bin
    directory.
-   If you are training on OS X, open a terminal window, and cd to
    /Applications/YourParaViewVersion/Contents/bin. pvbatch will be
    located here.
-   If you are training on Windows, pvbatch does not exist. But, for a
    single process, such as this training, pvpython will substitute.

### Lets create a Python trace.

Since we are on Windows, we will create a python trace, and use pvpython
to process it.

-   Read exodus data, screenshot, movie.
    -   Run ParaView.
    -   Tools/ Start Trace
    -   Read can.ex. Turn all of the variables on. Apply.
    -   +Y
    -   Go forward one timestep
    -   Color by EQPS
    -   Save Screenshot
    -   Save Animation
    -   Stop trace
    -   Save this script on your desktop
    -   Edit the file, change the following:
        -   Correct the path to the input data and output screenshots or
            animations (not necessary, since you made the trace)
        -   Uncomment the line that says renderView\*.ViewSize. Change
            this to something reasonable (maybe 1920x1080)

### Let\'s now batch run this Python trace.

-   Delete the Screenshot and Animation you made above. We want to
    recreate these
-   Open a CMD window. (On the Start button, type cmd, then click on
    Command Prompt.)
-   cd to the ParaView bin directory
    -   cd c:\\Program Files (x86)\\ParaView 5.4.1\\bin
-   Use pvpython to process our trace. Notice that pvpython understands
    forward slashes.
    -   pvpython.exe
        c:/Users/myUserName/Desktop/trainingExampleScriptA.py
-   Open the Screenshot and Animation that you just made.

### Let\'s edit the trace to accept arguments

-   Edit the python trace.
-   Right above the ExodusIIReader, enter the following code:
    -   datasetIn = sys.argv\[1\]
    -   directoryOut = sys.argv\[2\]
    -   imageFilesOut = sys.argv\[3\]

<!-- -->

-   -   print \"datasetIn = \"+datasetIn
    -   print \"directoryOut = \"+directoryOut
    -   print \"imageFilesOut = \"+imageFilesOut

<!-- -->

-   Edit the **canex2 = ExodusIIReader** line as follows:
    -   canex2 = ExodusIIReader(FileName=\[datasetIn\])

<!-- -->

-   Edit the **SaveScreenshot(\...)** line as follows:
    -   SaveScreenshot(directoryOut+imageFilesOut+\'.png\', renderView1,
        ImageResolution=\[1425, 1324\])

<!-- -->

-   Edit the **SaveAnimation(\...)** line as follows:
    -   SaveAnimation(directoryOut+imageFilesOut+\'.avi\', renderView1,
        ImageResolution=\[1424, 1324\], FrameWindow=\[0, 43\])

<!-- -->

-   Now, run in a command window as follows:
    -   pvpython.exe
        \"c:/Users/myUserName/Desktop/trainingExampleScriptA.py\"
        \"C:/Users/myUsername/Desktop\" \"coolVizA\"

Sandia National Labs specific section
-------------------------------------

This section is specific to the clusters and environment at Sandia
National Laboratories.

PvBatch on the clusters
-----------------------

ssh into one of the clusters. PvBatch can be run on the login nodes, and
magically will acquire compute nodes and run your batch visualization in
parallel. You will find test scripts at /projects/viz/training/paraview.
These scripts are run as follows:

:   **/projects/viz/paraview/bin/pvbatch\_chama\_mesa**

<!-- -->

:   This is version 5.4.0 of pvbatch.
:   Incorrect number of argument supplied. Expecting 4 but have 0
:   Usage: /projects/viz/paraview/bin/pvbatch\_chama\_mesa <Nodes>
    <Minutes> <HERT estimate> batchFileFullPath

<!-- -->

:   An example is
:   **/projects/viz/paraview/bin/pvbatch\_chama\_mesa 1 10 FY123456
    /projects/viz/training/paraview/whipple-A.py**

PvBatchOnNode on the clusters
-----------------------------

pvbatch can be run on the same nodes as your simuation. Ask ParaView
help for more information on how to use this feature.

Example scripts
---------------

Here are four examples. We are going to create scripts using the trace
recorder, then run these scripts using pvbatch.

-   Read exodus data, screenshot, movie.
    -   Run ParaView.
    -   Start Trace
    -   Read g1s1.e.16.\[0-15\]
    -   Go to last timestep
    -   Go back one timestep
    -   Color by EQPS
    -   Screenshot
    -   Animation
    -   Stop trace
    -   Save this script on your cluster.
    -   Edit the file, change the following:
        -   Correct the path to the input data and output screenshots or
            animations
        -   Uncomment the line that says renderView\*.ViewSize. Change
            this to something reasonable (maybe 1920x1080)
-   Read exodus data, Clip, Slice, screenshot, movie.
    -   Run ParaView.
    -   Start Trace
    -   Read g1s1.e.16.\[0-15\]
    -   Go to last timestep
    -   Go back one timestep
    -   Color by EQPS
    -   Clip
    -   Slice/ Y Normal
    -   Screenshot
    -   Animation
    -   Stop trace
    -   Save this script on your cluster.
    -   Edit the file, change the following:
        -   Correct the path to the input data and output screenshots or
            animations
        -   Uncomment the line that says renderView\*.ViewSize. Change
            this to something reasonable (maybe 1920x1080)
        -   Add the following line above ColorBy(\....,(\'EQPS\'))
            -   g1s110fpse16Display.SetScalarBarVisibility(renderView1,
                False)
-   Read exodus data, 2d plots, screenshot, movie
    -   Run ParaView.
    -   Start Trace
    -   Read g1s1.e.16.\[0-15\]
    -   Select point if possible
    -   Plot selection (or plot over line, if necessary)
    -   Plot EQPS
    -   Screenshot
    -   Animation
    -   Stop trace
    -   Edit the file, change the following:
        -   Correct the path to the input data and output screenshots or
            animations
        -   Uncomment the line that says renderView\*.ViewSize. Change
            this to something reasonable (maybe 1920x1080)
-   Read cth data, extractCTHPart, screenshot, movie.
    -   Run ParaView.
    -   Start Trace
    -   Read cth-med/spcta.\[0-31\]
    -   ExtractCTHParts - 1
    -   ExtractCTHParts - 2
    -   Stop trace

Where do you go next?
=====================

-   Python calculator and programmable fitler.

Acknowledgements
================

Sandia National Laboratories is a multi-mission laboratory managed and
operated by National Technology and Engineering Solutions of Sandia,
LLC., a wholly owned subsidiary of Honeywell International, Inc., for
the U.S. Department of Energy's National Nuclear Security Administration
under contract DE-NA-0003525.
