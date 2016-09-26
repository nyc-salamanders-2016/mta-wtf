class AddNextPrevStationToLineStation < ActiveRecord::Migration[5.0]
  def change
    add_column :line_stations, :next_station_id, :integer
    add_column :line_stations, :prev_station_id, :integer
  end
end
