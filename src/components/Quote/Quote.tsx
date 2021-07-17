import * as React from "react";
import { ArrowRepeat } from 'react-bootstrap-icons';
import UserSettingsProvider from '../../helpers/UserSettingsProvider';
import DataUrlProvider from '../../helpers/DataUrlProvider';

import './Quote.css';

class Quote extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchQuote("current");
  }

  fetchQuote(which: string) {
    const loadQuote = (quoteNo: number, quote: {}) => {
      this.setState({ quote: quote, progress: 'fetched' });
      UserSettingsProvider.set({ quoteSettings: { whenUsed: new Date().getTime(), lastUsed: quoteNo } });
    };
    const doFetch = (quoteNo: number) => DataUrlProvider.get("quotes", quoteNo)
      .then(urlInfo => fetch(urlInfo.url)
        .then(res => res.json())
        .then(quotes => loadQuote(quoteNo, quotes[quoteNo % urlInfo.pageSize])));

    UserSettingsProvider.get()
      .then(userSettings => userSettings.quoteSettings)
      .then((quoteSettings = { lastUsed: 1 }) => quoteSettings.lastUsed)
      .then(lastUsed => lastUsed + (which == "current" ? 0 : 1))
      .then(doFetch);
  }

  render() {
    if (this.state.quote) return (
      <div className="dashboard-quote-container">
        <figure className="blur-bg dashboard-quote font-monospace position-absolute bottom-0 start-50 translate-middle">
          <blockquote className="blockquote fs-3 text text-justify">{this.state.quote.text}</blockquote>
          <figcaption className="blockquote-footer fs-5 text text-end">
            <span>{this.state.quote.author}</span>
          </figcaption>
        </figure>

        <figure className="dashboard-quote font-monospace position-absolute bottom-0 start-50 translate-middle">
          <blockquote className="blockquote fs-3 text text-justify">{this.state.quote.text}</blockquote>
          <figcaption className="blockquote-footer fs-5 text text-end">
            <span>{this.state.quote.author}</span> | <ArrowRepeat className={'icon ' + this.state.progress} onClick={() => this.fetchQuote("next")} />
          </figcaption>
        </figure>
      </div>
    );
    else return (<div className="dashboard-quote-container"></div>);
  }
}

export default Quote