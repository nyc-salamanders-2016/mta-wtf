require 'csv'

stop_names = []

CSV.foreach('/Users/Henri/Desktop/MTA/initial-exploration/mta-wtf/public/stops.txt', headers: true) do |row|
  stop_name_with_commas = row.to_s.match(',.*[a-zA-Z].*?')
  stop_name_string = stop_name_with_commas.to_s
  stop_name_string.slice!(0..1)
 
  stop_lat = row.to_s.match('40.\d+')
  stop_lon = row.to_s.match('73.\d+')
  	if stop_lon == nil
  	  stop_lon = row.to_s.match('74.\d+')
  	end

  #turn lat and lon from objects to strings
  stop_lat = stop_lat.to_s
  stop_lon = stop_lon.to_s

  stop_info = {}
  stop_info[stop_name_string] = [stop_lat, stop_lon]
  stop_names << stop_info
end

#the below logic is because each stop is listed three times (i.e., 3 rows per stop), so this logic wil create a filtered array with only unique stops

unique_stop_names = []

stop_names.each_with_index do |stop, idx|
  if idx == 0 || idx % 3 == 0
    unique_stop_names << stop 
  end
end

# unique_stop_names array has relevant data (unique stops with lat and lon)
# unique_stop_names









