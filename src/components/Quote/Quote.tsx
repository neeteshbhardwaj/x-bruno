import * as React from "react";
import { ArrowRepeat } from 'react-bootstrap-icons';
import { decode as base64_decode, encode as base64_encode } from 'base-64';

import './Quote.css';

class Quote extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);
    const username = "client";
    const password = "client";
    this.state = {
      apiUrl: 'https://x-bruno-quote-0-8.herokuapp.com/quotes',
      authToken: `Basic ${base64_encode(`${username}:${password}`)}`,
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
    fetch(`${this.state.apiUrl}/${randomNumber}`, {
      headers: new Headers({ "Authorization": this.state.authToken }),
    })
      .then(res => res.json())
      .then(quote => this.setState({ quote: quote }));
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