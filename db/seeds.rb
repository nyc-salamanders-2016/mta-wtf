# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv'

path = Rails.root.join('lib', 'seeds', 'stations.csv')

CSV.foreach(path, {headers: true, converters: :numeric, header_converters: :symbol}) do |row|
  binding.pry
  line = Line.find_or_create_by(name: row[:line].to_s)
end
