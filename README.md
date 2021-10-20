# PremierLeagueAPI
A basic example of creating an API to collect Premier League News

Default API URL: https://premierleagueapi.herokuapp.com/

To get all articles picked up by the API: https://premierleagueapi.herokuapp.com/news

To get all articles from a specific news outlet append the news outlet as a new path after news.
Currently:
- https://premierleagueapi.herokuapp.com/news/theguardian
- https://premierleagueapi.herokuapp.com/news/espn
- https://premierleagueapi.herokuapp.com/news/skysports

Expected response:
[
  {
    "title":"English Premier LeaguePremier League",
    "url":"https://www.espn.com/soccer/league/_/name/eng.1",
    "source":"espn"
  }
]


Other plans to add more sources, add a limit, get better documentation
