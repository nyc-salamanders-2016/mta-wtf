class CreateStations < ActiveRecord::Migration[5.0]
  def change
    create_table :stations do |t|
      t.string :name
      t.integer :order
      t.float :lat
      t.float :lng

      t.timestamps
    end
  end
end
