class PagesController < ApplicationController
  def index
  end

  def main
    @lines = Line.all.as_json(include: { stations: { include: :line_stations}})
    @stations = Station.all.as_json(include: :lines)
  end

  def latest
    # # xml = File.read('db/mta_feed/20160924122800.txt')
    # xml = Net::HTTP.get(URI('http://web.mta.info/status/serviceStatus.txt'))
    # hash = Hash.from_xml(xml)
    # problem_lines = hash['service']['subway']['line'].reject{|line| line['status'] == 'GOOD SERVICE'}
    # html = problem_lines.reduce('') do |string, hash|
    #   if hash['text']
    #     string + hash['text']
    #   else
    #     string
    #   end
    # end
    # nok = Nokogiri::HTML(html)
    # # binding.pry
    # info = parse_all_live_data(nok)

    xml = Net::HTTP.get(URI('http://www.metroalerts.info/rss.aspx?rs'))

    hash = Hash.from_xml(xml)

    item = hash['rss']['channel']['item']

    delays = []

    item.each do |alert|
      delays <<
        {
            line: alert['title'],
            status: 'delays'
          }
    end

    render json: delays
  end

  def all_stations
    render json: Line.all.as_json(include: :stations)
  end

  private
  def parse_all_live_data(nok)
    result = []
    result += find_all_cancelations(nok)
    result += find_all_delays(nok)
  end

  def find_all_delays(nok)
    strings = nok.css('p').map(&:text).select{|str| str.match('delay')}
    binding.pry
    matches = strings.map {|text| text.match(/Due to (?<reason>.+) at (?<station>.+?), (?:(?<direction>\w+)\s)?(?<lines>\[.+\]) trains/)}
    matches.map {|match| parse_delay(match) if match}.flatten
  end

  def parse_delay(match, status='delays')
    match['lines'].scan(/\[(.)\]/).flatten.map do |line|
      {
        line: line,
        status: 'delays',
        reason: match['reason'],
        reason_station: match['station'],
        direction: match['direction']
      }
    end
  end

  def find_all_cancelations(nok)
    strings = nok.css('b').map(&:inner_text).select {|string| string.match(/\[(.)\] No trains/) }
    matches = strings.map {|text| text.match(/\[(.)\] No trains (.*)/) }
    matches.map {|match| parse_cancellation(match)}
  end

  def parse_cancellation(match)
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
