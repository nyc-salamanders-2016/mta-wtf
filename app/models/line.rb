class Line < ApplicationRecord
  has_many :line_stations
  has_many :stations, through: :line_stations
end
