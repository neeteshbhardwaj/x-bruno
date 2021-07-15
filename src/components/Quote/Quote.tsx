import * as React from "react";
import { ArrowRepeat } from 'react-bootstrap-icons';

import './Quote.css';

class Quote extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);
    this.state = {
      apiUrl: 'https://type.fit/api/quotes',
      quote: {
        "text": "Nothing is a waste of time if you use the experience wisely.",
        "author": "Rodin"
      }
    };
  }

  componentDidMount() {
    this.fetchNewQuote();
  }

  fetchNewQuote() {
    const randomNumber = Math.round(Math.random() * 1000);
    fetch(this.state.apiUrl)
      .then(res => res.json())
      .then(quotes => quotes[randomNumber])
      .then(quote => this.setState({quote: quote}));
  }

  render() {
    return (
      <figure className="dashboard-quote font-monospace position-absolute bottom-0 start-50 translate-middle">
        <blockquote className="blockquote fs-3 text text-justify">{this.state.quote.text}</blockquote>
        <figcaption className="blockquote-footer fs-5 text text-end">
          <span>{this.state.quote.author}</span> | <ArrowRepeat className="icon" onClick={() => this.fetchNewQuote()} />
          <span></span>
        </figcaption>
      </figure>
    );
  }
}

export default Quote