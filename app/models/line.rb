class Line < ApplicationRecord
  has_many :line_stations
  has_many :stations, through: :line_stations

  def stations_that_connect_to(station)
    stations = self.stations.sort_by {|sta| sta.order(self)}
    i = stations.find_index{ |sta| station.id == sta.id }
    result = []
    result << stations[i-1] if stations[i-1]
    result << stations[i+1] if stations[i+1]
    result
  end
end
