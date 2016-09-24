class CreateLines < ActiveRecord::Migration[5.0]
  def change
    create_table :lines do |t|
      t.string :name

      t.timestamps
    end
    add_index :lines, :name, unique: true
  end
end
