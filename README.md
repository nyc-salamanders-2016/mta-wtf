# README

MTA-WTF was made by @Dyoon3102, @elisuh, @heldaher, and @jnaftali their final project for @nyc-salamanders-2016.

MTA-WTF comes packaged with a CSV seed file (in `lib/seeds/stations.csv`) containing the New York City subway system. To adapt the app to use another subway's data just create a csv file with columns for stop_id, stop_name, stop_lat, stop_lon, line, and order. The line column should contain the NAME of the line that stops at that stop, and the order column should contain a number that represents the station's place in THAT line. For stations that serve multiple lines just list them multiple times changing the line and order properties.

The way we handle live data, on the other hand, is very particular to the NYC subways. Other metros may or may not have similar pages that contain overviews of service status, and may or may not use phrasing that matches the regexp we were forced to use to parse that data. For that you're on your own. If anyone has ideas about using [GTFS](https://developers.google.com/transit/gtfs-realtime/) to use real time data that comes in a standard computer readable format please leave a comment or a pull request.
