import React, { useState, useEffect } from 'react'
import { Layout, List } from 'antd'

const config = {
  apiUrl: 'https://type.fit/api/quotes',
  imageUrl: 'https://source.unsplash.com/1920x1032/?'
}

const { Header, Content } = Layout

function App() {
  const [quotes, setQuotes] = useState([])
  const [image, setImage] = useState('https://source.unsplash.com/1920x1032/?')
  const [isLoading, setIsLoading] = useState(false)
  const [imageIsLoading, setImageIsLoading] = useState(false)

  useEffect(() => {
    getQuotes()

    setInterval(() => {
      getImages()
      // estimate the loading time of the image
      setTimeout(() => {
        getQuotes()
      }, 500)
    }, 7500)
  }, [])

  const getQuotes = () => {
    setIsLoading(true)
    fetch(config.apiUrl)
      .then(function (response) {
        return response.json()
      })
      .then((data) => {
        function getRandomInt(max) {
          return Math.floor(Math.random() * max)
        }
        setQuotes([data[getRandomInt(data.length)]])
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }
  const getImages = () => {
    setImageIsLoading(true)
    fetch(config.imageUrl + quotes)
      .then(function (response) {
        return response.url
      })
      .then((data) => {
        setImage(data)
        setImageIsLoading(false)
      })
      .catch(() => {
        setImageIsLoading(false)
      })
  }
  return (
    <Layout>
      <a
        style={{
          padding: '2px',
          position: 'fixed',
          color: 'white'
        }}
        href="https://honkitonkie.github.io/github-pages/#/exercises">
        &lt;&lt; (Back) to exercises
      </a>
      <Header style={{ backgroundColor: '#762109' }}>
        <div className="container">
          <h1 className="site-logo">Quotes are passing you by</h1>
        </div>
      </Header>
      <div
        id="setPic"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.4), rgba(255,255,255,.4)), url(${image})`
        }}>
        <Content className="container">
          <div className="vertical-center">
            <List
              loading={isLoading}
              dataSource={quotes}
              renderItem={(quote) => (
                <List.Item>
                  <p className="quoteContent">
                    <span className="quote">
                      <strong>{quote.text}</strong>
                    </span>
                    <span className="author">{quote.author}</span>
                  </p>
                </List.Item>
              )}
            />
          </div>
        </Content>
      </div>
    </Layout>
  )
}

export default App
