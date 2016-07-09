class CreateLines < ActiveRecord::Migration
  def change
    create_table :lines do |t|
      t.string :nodes, array: true, default: []
      t.timestamps null: false
    end
  end
end
