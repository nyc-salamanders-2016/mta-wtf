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
  station = Station.find_or_create_by(id: row[:stop_id])
  line = Line.find_or_create_by(name: row[:line].to_s)
  station.lines << line unless station.lines.any? {|oldline| oldline.name ==line.name}
  station.assign_attributes(name: row[:stop_name], lat: row[:stop_lat], lng: row[:stop_lon], order: row[:order])
  station.save
end
