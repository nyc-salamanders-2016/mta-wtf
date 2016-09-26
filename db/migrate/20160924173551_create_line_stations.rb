class CreateLineStations < ActiveRecord::Migration[5.0]
  def change
    create_table :line_stations do |t|
      t.references :line, foreign_key: true, index: true
      t.references :station, foreign_key: true, index: true
      t.integer :order

      t.timestamps
    end
  end
end
