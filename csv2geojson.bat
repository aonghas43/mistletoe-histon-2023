rem
rem (c) HIGS January 2024
rem
set YEAR=2023-24

rem
rem don't change below here
rem

set NAME="HIGS %YEAR% Mistletoe"
set DESC="HIGS %YEAR% Mistetoe Survey"
set INFILE=Book1.csv
set OUTFILE=mistletoe.json
set CRS=EPSG:4258
rem https://epsg.io/4258 lat-long UK and Europe
rem assumes column headings
rem Tree	Location description	Surroundings	Tree type (if known)	As recorded	Used for total counted	Easting	Northing	What3words	Lat	Long	Grid ref	First surveyed	Last Surveyed	Picture

rem
rem OGIS free software ogr2ogr for conversion from CSV to GeoJSON
rem
ogr2ogr -if CSV -oo Y_POSSIBLE_NAMES=Lon* -oo X_POSSIBLE_NAMES=Lat*  -oo KEEP_GEOM_COLUMNS=NO -a_srs %CRS% -f GeoJSON -nlt POINT -nln %NAME% -lco DESCRIPTION=%DESC% -lco ID_FIELD=Tree -lco RFC7946=YES %OUTFILE%   %INFILE%

rem TSV maybe btter since street address may contains commas
rem ogr2ogr -if CSV  -oo SEPARATOR=TAB -oo Y_POSSIBLE_NAMES=Lon* -oo X_POSSIBLE_NAMES=Lat*  -oo KEEP_GEOM_COLUMNS=NO -a_srs %CRS% -f GeoJSON -nlt POINT -nln %NAME% -lco DESCRIPTION=%DESC% -lco ID_FIELD=Tree -lco RFC7946=YES %OUTFILE%   %INFILE%
