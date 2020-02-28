Introduction
============

This usecase shows a user how to add pictures and movies to PowerPoint
slides.

Save Screenshot
---------------

-   Start ParaView.
-   **File → Open**. We will use the data can.exo for this usecase.
-   Click **Apply**.
-   Rotate and position the object.

<!-- -->

-   **File → Save Screenshot**.
    -   Save only selected view will save either the whole window, or
        the selected view.
    -   Change the size of the output files. Note that ParaView can save
        files that are significantly larger than the current view. This
        is done in off screen memory.
    -   Leave image quality as is.
    -   Override Color Palette allows a user to change the background
        color - for instance, to white.
    -   Stereo mode allows a user to save stereo images.
-   **OK**
    -   Save your images as .png or .jpg. .png is a cleaner format, but
        .jpg\'s may be smaller.
-   Name and save the file. **OK**

In PowerPoint, add a new slide. Next, click **Insert→ Picture→ From
File...**, and pick up the file that we saved in the previous paragraph.
You can move the file anywhere you want by holding the left mouse button
and dragging. You can resize the picture by grabbing one of the corners
and dragging the picture smaller. The following picture is from a
PowerPoint slide.

Save Animation (make a movie)
-----------------------------

-   Start ParaView.
-   **File → Open**. We will use the data can.exo for this usecase.
-   Click **Apply**.
-   Rotate and position the object.

<!-- -->

-   **File → Save Animation**.
    -   Leave Frane Rate and No. of Frames alone.
    -   Change the size of the output files. Note that ParaView can save
        files that are significantly larger than the current view. This
        is done in off screen memory.
    -   Set timestep range.
    -   Stereo mode allows a user to save stereo images.
-   **OK**
    -   Save your movie. A great option is to save your images as .png
        or .jpg, and then post process them into .avi or .mov files.
        This way, you have your movies and the individual frames. .png
        is a cleaner format, but .jpg\'s may be smaller.
-   Name and save the file. **OK**

In PowerPoint, add a new slide. Next, click "Insert/ Movies and Sounds/
Movie from File. Browse to the location of your movie, select your file
and click OK. Decide if you want the slide show to be Automatic, or when
clicked. Finally, remember that this file is NOT inserted into the
PowerPoint slide. You will want this file to be on the computer -- in
the same location -- as it was when you selected it.

A few notes on file formats for movies. You can make .avi files directly
on Windows, Linux or Mac. If you are trying to make movies on Linux or
Mac, or are making movies for a powerwall, use format .png or .jpg.
Then, if you want .avi files for use with PowerPoint, convert these
movies to .avi format as needed. One option is to use enve, which is
available when downloading EnSight. Windows reads .avi files well, both
using and not using PowerPoint. Linux is able to display either format
if the correct video player is installed. One option is mplayer. mplayer
is installed from .rpm files, which can be found on the net.

Acknowledgements
================

Sandia National Laboratories is a multi-mission laboratory managed and
operated by National Technology and Engineering Solutions of Sandia,
LLC., a wholly owned subsidiary of Honeywell International, Inc., for
the U.S. Department of Energy's National Nuclear Security Administration
under contract DE-NA-0003525.
