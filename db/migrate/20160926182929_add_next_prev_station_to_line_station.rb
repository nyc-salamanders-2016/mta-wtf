class AddNextPrevStationToLineStation < ActiveRecord::Migration[5.0]
  def change
    add_column :line_stations, :next_station_id, :integer, index: true
    add_column :line_stations, :prev_station_id, :integer, index: true
  end
end
