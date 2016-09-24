class CreateLineStations < ActiveRecord::Migration[5.0]
  def change
    create_table :line_stations do |t|
      t.references :line, foreign_key: true
      t.references :station, foreign_key: true

      t.timestamps
    end
  end
end
