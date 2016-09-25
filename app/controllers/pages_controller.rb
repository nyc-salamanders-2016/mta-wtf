class PagesController < ApplicationController
  def index
  end

  def main
    @lines = Line.all.as_json(include: { stations: { include: :line_stations}})
    @stations = Station.all.as_json(include: :lines)
  end

  def latest
    xml = Net::HTTP.get(URI('http://web.mta.info/status/serviceStatus.txt'))
    hash = Hash.from_xml(xml)
    html = hash['service']['subway']['line'].reduce('') do |string, hash|
      if hash['text']
        string + hash['text']
      else
        string
      end
    end
    nok = Nokogiri::HTML(html)
    info = parse_all_live_data(nok)
    render json: info
  end

  def all_stations
    render json: Line.all.as_json(include: :stations)
  end

  private
  def parse_all_live_data(nok)
    result = []
    result += find_all_cancelations(nok)
  end

  def find_all_cancelations(nok)
    strings = nok.css('b').map(&:inner_text).select {|string| string.match(/\[(.)\] No trains/) }
    matches = strings.map {|text| text.match(/\[(.)\] No trains (.*)/) }
    matches.map {|match| parse_value(match)}
  end

  def parse_value(match)
    hash = {}
    hash[:line] = match[1]
    case match[2]
    when /running/
      hash[:canceled] = true
    else
      hash[:canceled] = match[2].match(/between (.*) and (.*)/)[1,2]
    end
    hash
  end
end
