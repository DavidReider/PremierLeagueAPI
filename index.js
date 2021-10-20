const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()

//if base is empty, all href's are assumed to contain the full URL protocol
const newspapers = [
    {
        name: 'theguardian',
        address: 'https://www.theguardian.com/football/premierleague',
        base: ''
    },
    {
        name: 'espn',
        address: 'https://www.espn.com/soccer/league/_/name/eng.1',
        base: 'https://www.espn.com'
    },
    {
        name: 'skysports',
        address: 'https://www.skysports.com/premier-league-news',
        base: 'https://www.skysports.com'
    }
]

const articles = []

newspapers.forEach( newspaper => {
    axios.get(newspaper.address)
    .then((response) => {
        const html = response.data
        const $ = cheerio.load(html)
        $('a:contains("Premier"), a:contains("Chelsea"), a:contains("Liverpool"), a:contains("Manchester United"), a:contains("Brighton"), a:contains("Tottenham"), a:contains("Manchester City"), a:contains("West Ham"), a:contains("Everton"), a:contains("Brentford"), a:contains("Wolves"), a:contains("Leicester"), a:contains("Arsenal"), a:contains("Villa"), a:contains("Crystal Palace"), a:contains("Southampton"), a:contains("Watford"), a:contains("Leeds"), a:contains("Burnley"), a:contains("Newcastle"), a:contains("Norwich")', html).each(function (){
            const title = $(this).text().trim()
            let url = $(this).attr('href')
            if ( url === '/premier-league'){ return }
            if( newspaper.base !== '' && !url.includes(newspaper.base) ){
                url = newspaper.base + url
            }
            articles.push({
                title,
                url,
                source: newspaper.name
            })
        })
    }).catch((err) => console.log(err))
})

app.get('/', ( req, res ) => {
    res.json('Welcome to my Premier League New API')
})

app.get('/news', ( req, res ) => {
    res.json(articles);
})

app.get('/news/:newspaperId', ( req, res ) => {
    const newspaperId = req.params.newspaperId
    const newspaperAddress = newspapers.filter( newspaper => newspaper.name == newspaperId)[0].address
    const newspaperBase = newspapers.filter( newspaper => newspaper.name == newspaperId)[0].base

    axios.get(newspaperAddress)
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)
            const specificArticles = []
            
            $('a:contains("Premier"), a:contains("Chelsea"), a:contains("Liverpool"), a:contains("Manchester United"), a:contains("Brighton"), a:contains("Tottenham"), a:contains("Manchester City"), a:contains("West Ham"), a:contains("Everton"), a:contains("Brentford"), a:contains("Wolves"), a:contains("Leicester"), a:contains("Arsenal"), a:contains("Villa"), a:contains("Crystal Palace"), a:contains("Southampton"), a:contains("Watford"), a:contains("Leeds"), a:contains("Burnley"), a:contains("Newcastle"), a:contains("Norwich")', html).each(function (){
                const title = $(this).text().trim()
                let url = $(this).attr('href')
                if ( url === '/premier-league'){ return }
                if( newspaperBase !== '' && !url.includes(newspaperBase)){
                    url = newspaperBase + url
                }
                specificArticles.push({
                    title,
                    url,
                    source: newspaperId
                })
            })
            res.json(specificArticles)
        }).catch((err) => console.log(err))
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))