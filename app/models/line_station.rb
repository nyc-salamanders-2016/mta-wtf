class LineStation < ApplicationRecord
  belongs_to :line
  belongs_to :station
  belongs_to :next_station, class_name: 'Station', foreign_key: 'next_station_id', optional: true
  belongs_to :prev_station, class_name: 'Station', foreign_key: 'prev_station_id', optional: true

  validates :line, uniqueness: { scope: :station }
end
