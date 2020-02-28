Introduction
============

ParaView offers a rich and powerful Python interface. This allows users
to automate processing of their data, and gives access to powerful tools
in the Visualization Tool Kit (VTK). This tutorial will describe
ParaView and Python. It shows a user how to drive ParaView using Python
commands, and how to automate the creation and use of these commands.

Overview
========

ParaView is a client/ server architecture. The client includes the
ParaView GUI and display. The server reads the user\'s data, processes
the data, and passes these images to the client. We can use Python to
control ParaView either in the GUI, at the client level, or directly on
the server.

A simple Python toy example within ParaView
===========================================

-   Start **ParaView**.
-   Start the Python Interpreter **Tools → Python Shell**

:   Notes

    :   You can copy commands from elsewhere and paste them into the
        Python Shell.
    :   Python is case sensitive. Be sure to use correct capitalization
        as shown below.
    :   Python is indent sensitive. Be sure to not indent, as shown
        below.

<!-- -->

:   Lets create and display a sphere.

    :   (Type the following into the Python Shell)

        :   **sphere=Sphere()**
        :   **Show()**
        :   **Render()**

<!-- -->

:   We have now created a sphere in the pipeline, turned on it\'s
    visibility, and re-rendered.

<!-- -->

:   Next, lets add a shrink filter. We hide the sphere, add the shrink
    filter, and re-render.

    :

        :   **Hide()**
        :   **Render()**
        :   **shrink=Shrink()**
        :   **Show()**
        :   **Render()**

<!-- -->

:   ParaView will allow us to use either the GUI controls or Python. For
    instance:

    :   Select the Sphere in the pipeline browser.
    :   In the Python Shell, type the following:

        :   **clip=Clip()**
        :   **Show()**
        :   **Render()**

    :   Or, we could continue in the Python as follows:

        :   **clip=Clip()**
        :   **Hide(shrink)**
        :   **Show(clip)**
        :   **Render()**

<!-- -->

:   Hide the Plane widget:

    :

        :   \'\'\'Hide3DWidgets(proxy=clip)

<!-- -->

:   Help! (How do we find out what commands are available?)

    :   To see all commands available in ParaView:

        :   **dir()**

    :   To see all of the options for the Clip creator:

        :   **dir(Clip)**

    :   To see all of the options for the instance of the clip we
        created above:

        :   **dir(clip)**

    :   A better tool to see the available commands for an item in the
        pipeline is ListProperties, such as:

        :   **clip.ListProperties()**

            :   Note that this doesn\'t work on instantiated controls,
                such as the camera. Use dir() for controls such as
                camera.

<!-- -->

:

    :   To see lots of detail on an instance of a command, create the
        instance and ask for help on that instance..

        :   **help(clip)**

<!-- -->

:   Change! (Lets look at, and change, something)

    :   Print the Theta Resolution

        :   **print(sphere.ThetaResolution)**

    :   Change it to 64

        :   **sphere.ThetaResolution=64**
        :   **Show()**
        :   **Render()**

<!-- -->

:   Control input

    :   Lets change the selected filter in the Pipeline Browser:

        :   **SetActiveSource(sphere)**

    :   Lets delete the clip

        :   **Delete(clip)**

    :   Lets add a filter to the sphere, without selecting it first

        :   **wireframe=ExtractEdges(Input=sphere)**
        :   **Show()**
        :   **Render()**

A simple Python example reading a datafile and writing a screenshot
===================================================================

-   Within the ParaView GUI, **Edit → Reset Session**
-   Start the Python Interpreter **Tools → Python Shell**

### Read in data, use a filter and save a screenshot

:   Lets read in can.exo, clip can.exo, paint can.exo and save a
    screenshot.
:   We use this templagte.

    :

        :   **canex2=OpenDataFile(\'D:/directoryName/can.ex2\')**

:   Here is the current path. Be sure to update for version number

    :

        :   **canex2=OpenDataFile(\'C:/Program Files (x86)/ParaView
            5.4.1/data/can.ex2\')**
        :   **clip=Clip()**
        :   **Hide(canex2)**
        :   **Show(clip)**
        :   **ResetCamera()**
        :   **Render()**
        :   **SaveScreenshot(\'D:\\\\directoryName\\\\picture.jpg\')**

Information on file readers is found in chapter 2.2 of The ParaView
Guide <http://www.paraview.org/paraview-guide/>

### Control time

:

    :   We want to move forward one timestep, so min and max are set
        correctly for a variable

        :   **animationScene1 = GetAnimationScene()**
        :   **animationScene1.GoToNext()**

<!-- -->

:

    :   Playing through all time is done with the following command.

        :   **animationScene1.Play()**

<!-- -->

:

    :   First timestep is found using either of these methods:

        :   **animationScene1.GoToFirst()**
        :   **animationScene1.AnimationTime = timesteps\[0\]**

<!-- -->

:

    :   Last timestep is found using either of these methods:

        :   **animationScene1.GoToLast()**
        :   **animationScene1.AnimationTime = timesteps\[-1\]**

<!-- -->

:

    :   Moving to a specific timestep (such as timestep 10) is done like
        this:

        :   **animationScene1.AnimationTime = timesteps\[9\]** \# index
            starts with 0

<!-- -->

:

    :   To get all available timesteps in the \"scene\", you can query
        the time-keeper

        :   **tk = GetTimeKeeper()**
        :   **timesteps = tk.TimestepValues**

<!-- -->

:

    :   To find out how many timesteps we have, you use the len command.
        Continued on from above.

        :   **numTimesteps = len(timesteps)**

<!-- -->

:

    :   Available commands are found using:

        :   **dir(animationScene1)** (after you have created the
            animationScene1 variable)
        :   **dir(GetAnimationScene())**

### Control the camera

:

    :   We want to move the camera.
    :   First, get the camera and reset the camera to a known good
        position.

        :   **camera=GetActiveCamera()**
        :   **camera.SetFocalPoint(0,0,0)**
        :   **camera.SetPosition(0,0,-10)**
        :   **camera.SetViewUp(0,1,0)**

<!-- -->

:

    :   How to move the camera closer or further away

        :   **camera.Dolly(10)**
        :   **Render()**
        :   **camera.Dolly(.1)**
        :   **Render()**

<!-- -->

:

    :   How to rotate the camera around the view direction 45 degrees,
        centered on the dataset. After the reset above, rotate around
        the X axis.

        :   **camera.Roll(45)**
        :   **Render()**

<!-- -->

:

    :   How to rotate the camera around the vector up, centered on the Y
        axis. After the reset above, rotate around the Y axis.

        :   **camera.Yaw(45)**
        :   **Render()**

<!-- -->

:

    :   How to rotate the camera vertically around the camera point

        :   **camera.Pitch(45)**
        :   **Render()**

<!-- -->

:

    :   How to rotate the camera around the vector up, centered on the
        dataset. After the reset above, rotate around the Y axis.

        :   **camera.Azimuth(45)**
        :   **Render()**

<!-- -->

:

    :   How to rotate the camera around the X axis, centered on the
        dataset. After the reset above, rotate around the Y axis.

        :   **camera.Elevation(45)**
        :   **Render()**

<!-- -->

:

    :   How to reset the camera

        :   **ResetCamera()**

<!-- -->

:

    :   Available commands are found using:

        :   **dir(camera)** (after you have created the animationScene1
            variable)
        :   **dir(GetActiveCamera())**

### Paint by a variable

:

    :   We want to color by the variable.
    :   Be sure to Show the Clip, and not the Can.
    :   Steps are, move forward one timestep, get the renderview, get
        the display, get the variables, ColorBy.

        :   **animationScene1 = GetAnimationScene()**
        :   **animationScene1.GoToNext()**
        :   **renderView1 = GetActiveViewOrCreate(\'RenderView\')**
        :   **canex2Display = Show(clip, renderView1)**

    :   Get point var names

        :   \'\'\'canexxxx =GetActiveSource()
        :   **print ( canexxx.PointVariables.GetAvailable())**

    :   Get Cell var names

        :   **print ( canexxx.ElementPointVariables.GetAvailable())**

    :   For point vars

        :   **vars = canex2.PointVariables.GetAvailable()**
        :   \'\'\'print (vars)
        :   **ColorBy(canex2Display, (\'POINTS\', vars\[0\]))**

    :   For cell vars

        :   **vars = canex2.ElementVariables.GetAvailable()**
        :   \'\'\'print (vars)
        :   **ColorBy(canex2Display, (\'CELLS\', vars\[0\]))**

<!-- -->

:

    :   **Render()** (Actually not needed)

Information on reading variable information is found in chapter 3.3 of
The ParaView Guide <http://www.paraview.org/paraview-guide/>

Scale Around Dataset Center - A userful example
===============================================

:   We want to create a script that allows us to scale a dataset around
    it\'s center.

    :   This example shows how to get the active source, get the bounds,
        and transform the camera.

<!-- -->

:

    :   **Scale\_factor = 2**
    :   **indata = GetActiveSource()**

<!-- -->

:

    :   **bounds = indata.GetDataInformation().GetBounds()**
    :   **center = ((bounds\[0\] + bounds\[1\])/2, (bounds\[2\] +
        bounds\[3\])/2,(bounds\[4\] + bounds\[5\])/2)**

<!-- -->

:

    :   **transform\_to\_center = Transform()**
    :   **transform\_to\_center.Transform.Translate = \[-center\[0\],
        -center\[1\], -center\[2\]\]**
    :   **Hide()**

<!-- -->

:

    :   **scale = Transform()**
    :   **scale.Transform.Scale = \[scale\_factor, scale\_factor,
        scale\_factor\]**
    :   **Hide()**

<!-- -->

:

    :   **transform\_from\_center = Transform()**
    :   **transform\_from\_center.Transform.Translate = \[center\[0\],
        center\[1\], center\[2\]\]**
    :   **Show()**

<!-- -->

:

    :   **Render()**

Trace Recorder
==============

ParaView includes a tool to automatically generate Python scripts for
us. It is called the Trace Recorder. An example is as follows.

:   Read in can.exo, clip can, paint by EQPS, change the camera to +Y,
    write out a screenshot and write out a movie

-   **Tools → Start Trace** Select **Show Incremental Trace**.
-   **File → Open**. Open can.exo. OK.
-   Turn all variables on.
-   **Apply**.
-   **+Y**
-   Clip. Y Normal. Unselect Show Plane. Apply.
-   Color by EQPS.
-   Last timestep.
-   Rescale to Data Range
-   First timestep.
-   **File → Save Screenshot**. Save as .png.
-   **File → Save Animation**. Save as .avi.
-   **Tools → Stop Trace**
-   **File → Save**. Save to a known location.

:   Another way to find Python for ParaView is through Save State. This
    should be a last resort, but it may include commands that the Trace
    Recorder missed. \'\'\'File → Save State → Python State File.

Running Scripts
===============

ParaView allows a user to run a script. This is done as follows:

-   **Tools → Python Shell**
-   **Run Script**

Now, browse to your script, and select OK.

Macros
======

ParaView can save and use Python scripts that have been placed in a
known location. When you create a trace, you have the option to **File →
Save As Macro**. You also have the option on the Macros menu to **Add
new macro**. Macros will be added to the Macro toolbar at the top of the
ParaView GUI. You can edit and delete these Macros through the **Macro
menu**.

:   As an example, lets add the python script that we created above.

-   **Macros → Add new macro**, find your macro, and click **OK**.
-   Click on your **Macro** on the toolbar.

Python Help
===========

Python documentation (out of date)
<http://www.paraview.org/Wiki/ParaView/Python_Scripting>

The ParaView Guide (Python scattered throughout the guide)
<http://www.paraview.org/paraview-guide/>

Where do you go next?
=====================

-   ParaView Batch.

Acknowledgements
================

Sandia National Laboratories is a multi-mission laboratory managed and
operated by National Technology and Engineering Solutions of Sandia,
LLC., a wholly owned subsidiary of Honeywell International, Inc., for
the U.S. Department of Energy's National Nuclear Security Administration
under contract DE-NA-0003525.
