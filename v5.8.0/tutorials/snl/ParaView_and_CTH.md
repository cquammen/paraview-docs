Visualizing CTH datasets
========================

This tutorial shows how to visualize CTH datasets (called spcth files).
CTH is a multi-material, large deformation, strong shock wave, solid
mechanics code developed at Sandia National Laboratories. A more
complete writeup on CTH is here: <http://www.sandia.gov/CTH/>. CTH
Spyplot files are Eulerian, or structured mesh datasets. They can be
flat mesh or adaptive mesh refinement (i.e., AMR).

-   This tutorial assumes that the user is already farmiliar with
    ParaView. If necessary, see tutorials
    <https://www.paraview.org/Wiki/Beginning_ParaView> and
    <https://www.paraview.org/Wiki/Beginning_Sources_and_Filters>.

Startup Screen
--------------

<https://www.paraview.org/Wiki/Beginning_ParaView#Startup_Screen>

Getting Started Guide
---------------------

<https://www.paraview.org/Wiki/Beginning_ParaView#Getting_Started_Guide>

Help Menu
---------

<https://www.paraview.org/Wiki/Beginning_ParaView#Help_Menu>

ParaView and CTH
================

ParaView reads spcth files in an very efficient manor. All material
volume arrays go from 0 (representing 0%) to 1 (representing 100%).
These are actually stored in the files as floats (4 bytes) or doubles (8
bytes). ParaView reads these into unsigned bytes, which range from 0 to
255. Generally, you want a surface (contour or clip by scalar) at about
10%.

Creating contours with the Extract CTH Parts filter
===================================================

Our goal is to create a contour where Material Volume Fractions is at
10%.

-   Start ParaView.

<!-- -->

-   Open **spcta\_a.0.\[0-3\]**. Turn all **variables** on. **Apply**.
    -   There are three types of data that have been read in.
    -   **Volume data** is the structured data from the CTH simuliation
    -   **Tracers** are points in the mesh that move with a material,
        and can include variable information.
    -   **Markers** are groups of points that move with a material.
    -   Notice the **Down Convert Volume Fraction** has been checked.
        This means that ParaView will store volume fractions as an
        unsigned byte.

![](CTH-1.JPG "CTH-1.JPG")

-   **Y-**
-   Note that since we will have two materials touching each other, our
    default **Volume Fraction Value** will have some cells visible on
    top of each other. If this is not desired, change the value to
    **0.5**.
-   Coloring by point will be smoother than color by cell. Thus, we will
    convert variables to be point for anything we color.
-   Filters/ CTH/ **Extract CTH Parts**. Turn off all Volume Arrays,
    except **Material volume fraction - 1**. **Apply**.
-   Filters/ Alphabetical/ **Cell Data to Point Data**. Apply.
-   Paint by **Pressure**.
-   In the Pipeline Browser, select Volume Data (i.e., the raw cth data
    again).
-   Filters/ CTH/ **Extract CTH Parts**. Turn off all Volume Arrays,
    except **Material volume fraction - 2**. **Apply**.
-   Change Representation to \"Surface With Edges\".

![](CTH-2.JPG "CTH-2.JPG")

-   Change Representation back to \"Surface\".
-   With the **left mousebutton**, grab the 3d view and drag down. This
    will rotate the block face down.
-   With the **right mousebutton**, grab the 3d view and drag down. This
    will move closer to the block face.
-   **Play** forward to about the 8th timestep.

![](CTH-3.JPG "CTH-3.JPG")

Creating a filled isovolume with the Clip by Scalar filter
==========================================================

Our goal is to create a solid 3d isovolume where Material Volume
Fractions is at 10%. We want to do this so we can then take slices
through the object.

Lets start from scratch.

-   Edit/ Reset Session.
-   Open **spcta\_a.0.\[0-3\]**. Turn all **variables** on. **Apply**.

We now want to move our data to point based, as opposed to cell based
data.

-   Filters/ Alphabetical/ **Cell Data to Point Data**. **Apply**

We now extract one material volume. ParaView has actually read in
Material volume fraction data as an unsigned byte, running from 0 to
255. 10% full is about 25, 50% is 128. Lets create an isovolume at 10%.

-   Filters/ Common/ **Clip**. **Clip Type** - **Scalar**. **Scalars** -
    **Material volume fraction - 1**. **Value** - **25**. **Apply**.
-   Turn off **visibility** of the Cell Data to Point Data filter.
-   Filters/ Common/ **Slice**. **Y Normal**. **Apply**. **Unselect**
    the Show Plane check box.
-   Color by **Pressure**.

We now want to change the colormap.

-   View/ **Color Map Editor**. (There is a shortcut icon below the Edit
    menu.) Click the **Preset** icon (little folder with a heart).
    **Rainbow Desaturated**. **Apply**. **Close**.
-   Click **Rescale to Custom Data Range** (small icon below Sources).
    Set range from **0 to 2e10**.

![](CTH-4.JPG "CTH-4.JPG")

-   Select the **Volume Data** in the pipeline browser.
-   Filters/ CTH/ **Extract CTH Parts**. Select only **Material volume
    fraction - 2**. **Apply**.
-   **Cell Data to Point Data**. **Apply**. (This will smooth out the
    colors on each cell.)
-   Paint by **Temperature (eV)**

This image has three slices, opacity turned to 0.5 and the Extract CTH
Parts filter is being painted by temperature.

![](CTH-5.JPG "CTH-5.JPG")

Analyzing fragments with the Material Interface filter
======================================================

Our next goal is to analyze the fragments created by this simulation. To
do this, we use the Material Interface Filter.

Lets start again from scratch.

-   Edit/ Reset Session.
-   Open **spcta\_a.0.\[0-3\]**. Turn all **variables** on. **Apply**.

This filter is tricky. Do exactly as follows.

-   /Filters/ CTH/ **Material Interface Filter**.
-   **Select Material Fraction Arrays** select **Material volume
    fraction - 1** (which is the ball).
-   **Select Mass Arrays** select **Mass (g) -1** (which is the mass
    array for Material volume fraction - 1).
-   **Compute volume weighted average over:** select **Pressure** and
    **Temperature**.
-   **Compute mass weighted average over:** leave empty.
-   **Apply**
-   Go to the 10th timestep.
-   Paint by **Pressure**.
-   +Y

![](CTH-6.JPG "CTH-6.JPG")

-   Turn off visibility for the **geometry** in the Pipeline Browser.
    This is done by clicking the eyeball.

Anywhere there is a dot is the center of a fragment. We have statistics
for each of these fragments.

-   Turn on visibility for the **geometry** in the Pipeline Browser.

Now, lets look at the statistics in the spreadsheet view.

-   **split vertical**. (This icon is found in the upper right corner of
    the 3d window)
-   **Spreadsheet View**
-   In the **Pipeline Browser**, click the eyeball for **statistics**

Each row represents a fragment.

-   In the Spreadsheet View, click on the **Mass** column. You have now
    sorted the spreadsheet.

The biggest fragment is the top row.

-   Click on the top row. It is now selected in the 3d view above.
-   Click in the 3d view, then turn off visibility for the **geometry**
    in the Pipeline Browser. The geometry of the fragment is hiding the
    selected statistic point.

Note that you can also change the opacity of the geometry, so you can
see this selected point.

![](CTH-7.JPG "CTH-7.JPG")

Showing cell data
=================

Our next goal is to drill into and show individual cells\' data. This is
done with the the Hover Cells On function.

Lets start again from scratch.

-   Edit/ Reset Session.
-   Open **spcta\_a.0.\[0-3\]**. Turn all **variables** on. **Apply**.

We need a solid surface in which to work.

-   Representation: **Surface with Edges**
-   Color by: **Pressure**
-   **-Y**
-   Now, click on the **Hover Cells On** icon, upper left section of the
    View.
-   Hover, and stop, over the cells. The cell data will be displayed on
    screen.
    -   **Hover Cells On** is the only selection that works, and
        provides data.
-   If you want to look at cells in the middle of your dataset, use the
    **Clip**, **Slice** or **Clip by Scalar** filter to get to your
    data.

![](CTH-8.JPG "CTH-8.JPG")

Plot over line
==============

You can also create a 2d plot along a line through your dataset. Here is
how to do it.

Lets start again from scratch.

-   Edit/ Reset Session.
-   Open **spcta\_a.0.\[0-3\]**. Turn all **variables** on. **Apply**.

Again, we need a solid surface in which to work.

-   Representation: **Surface with Edges**
-   Color by: **Pressure**
-   **-Y**

You can now see where the aluminum ball is hitting the steel block.

-   Filters/ Data Analysis/ **Plot Over Line**.

We want to overlay the line horizontally across the area of interest,
just inside of the block. To do this, we will set it on the surface and
then move it.

-   Click X Axis. The line is now horizontal, through your data. The
    base of the arrow is on the right, the head is to the left.
-   Place the cursor at the right edge of the block, 3/4 of the way to
    the top. Hit the **1** key. You have now moved the base.
-   Place the cursor at the left edge of the block, 3/4 of the way to
    the top. Hit the **2** key. You have now moved the head.

![](CTH-9.JPG "CTH-9.JPG")

-   Make sure the **Plot Over Line** filter is still selected, and click
    **Apply**.
-   On the Properties tab, un-select all variables that you don\'t want
    to plot.
-   Additional information on how to run **Plot** filters is found here:
    <https://www.paraview.org/Wiki/Beginning_Plotting#Plot_along_a_line>

![](CTH-10.JPG "CTH-10.JPG")

Running on the clusters
=======================

<https://www.paraview.org/Wiki/Advanced_Client_Server>

Creating screenshots and movies
===============================

<https://www.paraview.org/Wiki/Beginning_Pictures_and_Movies>

Saving state
============

<https://www.paraview.org/Wiki/Advanced_State_Management>

Acknowledgements
================

Sandia National Laboratories is a multi-mission laboratory managed and
operated by National Technology and Engineering Solutions of Sandia,
LLC., a wholly owned subsidiary of Honeywell International, Inc., for
the U.S. Department of Energy's National Nuclear Security Administration
under contract DE-NA-0003525.
