# Data preparation for web page

## Input

Spreadsheet with columns

```text
Tree	Location description	Surroundings	Tree type (if known)	As recorded	Used for total counted	Easting	Northing Date Lat Long 	 National Grid KM Square

```

## Steps

### Spreadsheet

* take copy of the spreadsheet
* add a new sheet, copying the data from and including the header downwards (leave out anything above). This is for your working.
* Remove the "Observer" and any other columns with GDPR PII data from new sheet
* in the new sheet, create an excel column to help make the input for the OS batch converter : formula will be something like _CONCATENATE(G2, " ", H2)_ assuming the 2 columns are G and H
* drag formula to fill rest of column to limit of data
* copy contents of new column into a file and save as eg "coords.txt"
* check that the e, n coords are separated by a tab not spaces as this seems to affect how the conversion works
* upload to OS batch converter at <https://www.ordnancesurvey.co.uk/gps/transformation/batch#>
* Download the converted data : it will be a CSV file
* Open the converted CSV file using Excel. The column of interest is called something like **ETRS89 Geodetic ( Decimal Degrees )**
* Create a column headed **Lat** and a column headed **Long** (Uppercase 1st letter, important !)
* Formula in **lat** extracts the 2nd coordinate, since converted data is long-lat - assuming column is "K" : _=MID(K2, FIND(",", K2)+1, FIND(",", K2, FIND(",",K2)+1)-FIND(",", K2)-1)_
* Formula in **long**  - assuming column is "K" - is : _=LEFT(K2, FIND(",",K2)-1)_
* Drag both formulas down to limit of data
* Make a copy of your working sheet to another sheet, rename as "mistletoe"
* Copy the **lat**, **long** columns and past the "value" of them back over themselves. This is so you can remove the source ETRS89 column
* In new copy, remove the CONCATENATE column, the ETRS89 column
* Save spreadsheet
* Save as CSV - say **Yes** to only save current sheet and any prompts about removing unsupported features
* You should now have a file "Misteltoe.csv"

### OpenGIS converter

* Use the script **csv2geojson.bat**. Run in **OSGeo4W Shell** command prompt, and in folder where the **mistletoe.json** is located.

```text
 csv2geojson mistletoe
```

* Should create a file **mistletoe.json**

* contents of **mistletoe.json** should be put in the file **squarespace-block.input.txt** in the ection defining the variable _trees_

```script
<script type="text/javascript">
var trees = {
......

}
;
```