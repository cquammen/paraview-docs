Introduction
============

ParaView has two filters that give a user access to python math
functions as well as the underlying VTK library. These are the Python
Calculator and the Programmable Filter. This tutorial explains both.

Python Calculator
=================

The Python Calculator allows a user to apply calculations that are
available in Python. These include such functions as get volume of
cells, get area of cells, get the cross product, dot product, curl, etc.
The whole formula must fit on one line. Lets go over the Python
Calculator with an example.

:   Lets create a new point variable, loaded with 5.

-   Open can.exo. All variables on. Apply.
-   Filters → Alphabetical → Python Calculator.
-   Change Expression to 5, Array Association as Point Data, and change
    Array Name to **Calculated Variable**. Apply.
-   Paint by **Calculated Variable**.

:   Lets create a variable equal to two times displacement.

-   Change Expression to **DISPL\*2**. Apply.
-   Go to last timestep. Rescale to Data Range.

:   A more complete way to access displacement data. We explicitly pull
    DISPL from the first input to the filter. Don\'t forget that the
    first input is \[0\], the second is \[1\], etc.

-   Change Expression to **(inputs\[0\].PointData\[\'DISPL\'\])\*2**.
    Apply. Rescale to Data Range.

:   To recap, we are pointing to the first input to the filter, point
    data, the DISPL variable. We are multiplying by 2, and putting this
    into the Calculated Variable var.

<!-- -->

:   If a function requires a variable input, use the string above. If
    the function needs the input mesh, use inputs\[\].

<!-- -->

:   Notice that Python uses square brackets for arrays, and parenthesis
    to group parts of your formula. Also, to designate a string (i.e.,
    variable name), use either single or double quotation marks.

<!-- -->

:   A common request is to return a cell volume. It is done like this:

-   Change expression to **volume(inputs\[0\])**. Apply. Rescale to Data
    Range.

:   Numerous functions can be combined in one expression. For instance,
    a nonsensical expression would be to take a sin of a divergence of a
    curl. Here is the expression:

-   Change expression to **sin(divergence(curl(\'ACCL\')))**. Apply.
    Rescale to Data Range.

:   Interesting functions available through the Python Calculator:

-   area(dataset)
-   aspect(dataset)
-   cos(array)
-   cross(X,Y) where X and Y are two 3D vector arrays
-   curl(array)
-   divergence(array)
-   dot(a1,a2)
-   eigenvalue and eigenvector(array)
-   gradient(array)
-   max(array)
-   mean(array)
-   min(array)
-   norm(array)
-   sin(array)
-   strain(array)
-   volume(array)
-   vorticity(array)

:   The complete list can be found in the ParaView Guide,
    <http://www.paraview.org/paraview-guide/>

Programmable Source
===================

The Programmable Source is used to either be a source for new data, or
to read in data from a file. It is written in Python. Later, filters
will be used to modify this data. There is an extensive writeup on the
Programmable Source in the ParaView Guide,
<http://www.paraview.org/paraview-guide/>, in chapter 13.2. An example
of a Programmable Source would be reading a .csv file into ParaView,
once again from the ParaView Guide.

-   Create a .csv file named data.csv. Place the following into this
    file.

:

    :   x coord, y coord, z coord, scalar
    :   0,0,0,0
    :   1,0,0,1
    :   0,1,0,2
    :   1,1,0,2
    :   -0.5,-0.5,1,4
    :   -0.5,-0.5,1,5
    :   -0.5,-0.5,1,6
    :   -0.5,-0.5,1,7

-   Sources → Programmable Source
-   Change Output Dataset Type to vtkTable
-   Enter the following into the Script window:

:

    :   import numpy as np
    :   data = np.genfromtxt(\"c:/\.../data.csv\", dtype=None,
        names=True, delimiter=\',\', autostrip=True)
    :   for name in data.dtype.names:

        :

            :   array = data\[name\]
            :   output.RowData.append(array,name)

-   Filters → Table to Points filter. X Column == x\_coord, Y Column ==
    y\_coord, Z Column == z\_coord. Apply.
-   Select the 3d view, and turn on visibility.

:   Example Programmable Sources in the book are:

-   Reading a CSV file
-   Reading a CSV file series
-   Reading a CSV file with particles
-   Reading binary 2D image
-   Helix source

:   Programmable Sources are a quick, easy way to prototype readers.

Programmable Filter
===================

The Programmable Filter is used to modify data in the pipeline using
Python. There is an extensive writeup about the Programmable Filter in
chapter 13.3. Another good source of information is the Programmable
Filter wiki page, here:
<https://www.paraview.org/Wiki/Python_Programmable_Filter>. An example
of a Programmable Filter dividing a variable by 2:

-   Divide ACCL by 2
    -   Open can.exo. All variables on. Apply.
    -   Filters → Alphabetical → Programmable Filter. Leave Output Data
        Set Type as **Same as Input**.
    -   Enter the following into the Script window:

:

    :   input0=inputs\[0\]
    :   dataArray=input0.PointData\[\"ACCL\"\]/2.0
    :   output.PointData.append(dataArray, \"ACCL\_half\")

-   -   Paint by ACCL\_half

-   -   Subtract two datasets from each other. Use two instances of
    disk\_out\_ref.exo as two datasets, subtract GaMe3 from AsH3.
    -   Open disk\_out\_ref.exo. All variables on. Apply.
    -   Open disk\_out\_ref.exo. All variables on. Apply.
    -   Highlight both datasets. Use the <ctrl> key with the mouse to
        select more than one input.
    -   Filters → Alphabetical → Programmable Filter. Leave Output Data
        Set Type as **Same as Input**.
    -   Enter the following into the Script window:

:

    :   v\_0 = inputs\[0\].PointData\[\'AsH3\'\]
    :   v\_1 = inputs\[1\].PointData\[\'GaMe3\'\]
    :   output.PointData.append(v\_1 - v\_0, \'difference\')

-   -   Paint by difference

-   -   Create a tensor

:

    :   from paraview.vtk.numpy\_interface import dataset\_adapter as
        dsa
    :   import numpy
    :   def make\_tensor(xx,yy,zz, xy, yz, xz):

        :

            :   t = numpy.vstack(\[xx,yy,zz,xy, yz,
                xz\]).transpose().view(dsa.VTKArray)
            :   t.DataSet = xx.DataSet
            :   t.Association = xx.Association
            :   return t

<!-- -->

:

    :   xx = inputs\[0\].PointData\[\"sigma\_xx\"\]
    :   yy = inputs\[0\].PointData\[\"sigma\_yy\"\]
    :   zz = inputs\[0\].PointData\[\"sigma\_zz\"\]
    :   xy = inputs\[0\].PointData\[\"sigma\_xy\"\]
    :   yz = inputs\[0\].PointData\[\"sigma\_yz\"\]
    :   xz = inputs\[0\].PointData\[\"sigma\_xz\"\]
    :   output.PointData.append(make\_tensor(xx,yy,zz,xy,yz,xz),
        \"tensor\")

-   -   Subtract two timesteps from each other
    -   Example from Cory Quammen
    -   I think the Force Time filter will come in handy here for this
        use case. It can be used to \"freeze\" a dataset at a certain
        timestep.
        -   Load can.ex2
        -   Add a Force Time filter. Set the timestep to the one whose
            displacement you want to be zero. The output of this filter
            is the

can.ex2 dataset \"frozen\" at the chosen timestep. It will not change as
you advance through time.

-   -   Select both can.ex2 (using the <ctrl> key) and the ForceTime1
        sources in the Pipeline Browser. Note that the original can.ex2
        source will update as the

timestep changes, but the ForceTime1 source will not change.

-   -   Add a Python Calculator filter to substract the displacement in
        the \"frozen\" data set from the current timestep in can.ex2.
    -   Set the expression to

:

    :   inputs\[0\].PointData\[\'DISPL\'\] -
        inputs\[1\].PointData\[\'DISPL\'\]

-   -   The order of inputs into the Python Calculator is not well
        defined, so you may need to swap the indices in inputs\[0\] and
        inputs\[1\] to get the

correct sign on the result, but this should work.

-   -   (If desired,) Finally, add a Plot Selection over Time filter.
        This filter will run over all time steps, subtracting the data
        from the current timestep

from the data in the \"frozen\" timestep produced by the Force Time
filter, and plot the result in a graph. The first timestep should have a
value of 0.

-   Examples

[principleStrainPython](principleStrainPython.md)

:   Since the Programmable Source and Programmable Filters work at the
    server level, paraview.simple cannot be loaded or used.

Documentation(from an e-mail from Utkarsh)
------------------------------------------

-   -   Chapter 14 from the ParaView Guide.

:

    :   <http://www.paraview.org/paraview-guide/>

-   -   And the following series of Berk\'s blog posts:

:

    :   <https://blog.kitware.com/improved-vtk-numpy-integration/>
    :   <https://blog.kitware.com/improved-vtk-numpy-integration-part-2/>
    :   <https://blog.kitware.com/improved-vtk-numpy-integration-part-3/>
    :   <https://blog.kitware.com/mpi4py-and-vtk/>
    :   <https://blog.kitware.com/improved-vtk-numpy-integration-part-4/>
    :   <https://blog.kitware.com/improved-vtk-numpy-integration-part-5/>

-   -   Wiki page on the Programmable Filter

:

    :   <http://www.paraview.org/Wiki/Python_Programmable_Filter>

Acknowledgements
================

Sandia National Laboratories is a multi-mission laboratory managed and
operated by National Technology and Engineering Solutions of Sandia,
LLC., a wholly owned subsidiary of Honeywell International, Inc., for
the U.S. Department of Energy's National Nuclear Security Administration
under contract DE-NA-0003525.
