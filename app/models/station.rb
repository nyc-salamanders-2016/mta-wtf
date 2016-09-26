class Station < ApplicationRecord
  has_many :line_stations
  has_many :lines, through: :line_stations

  def order(line)
    LineStation.find_by(line: line, station: self).order
  end

  def connected_stations
    self.lines.map do |line|
      {line: line.name, stations: line.stations_that_connect_to(self)}
    end
  end
end
