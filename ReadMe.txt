
I use three kind of plugin to do the following process those are caman.js,filereader.js & jquery-mousewheel.js

 1.caman.js: Use for photo filters it have a good number of filters.

 2.filereader.js: Use this for drag/drop option

 3.mousewheel.js: Use this for filters scrolling option


In this code,  going to do the following:

1. Accept an image on drag and drop

2. Create a new canvas element (original), with a max size of 500x500px (customizable) and keep it in memory
		
3. Listen for clicks on the filters. When one is selected:
	3.1 Create a clone of the original canvas
	3.2 Remove any canvas elements currently on the page
	3.3 Append the clone to the #photo div
	3.4 If the selected filter is different from the "Normal" one, call the Caman library. Otherwise do nothing.
	3.5 Mark the selected filter with the "active" class

4. Trigger the "Normal" filter

	