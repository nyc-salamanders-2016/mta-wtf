class CreateStations < ActiveRecord::Migration[5.0]
  def change
    create_table :stations do |t|
      t.string :mta_id
      t.string :name
      t.float :lat
      t.float :lng

      t.timestamps
    end
  end
end
