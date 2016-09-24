class Station < ApplicationRecord
  has_many :line_stations
  has_many :lines, through: :line_stations
end
