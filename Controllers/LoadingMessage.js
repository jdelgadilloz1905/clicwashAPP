import React from 'react';

export default class LoadingMessage extends React.Component {
  constructor(props) {
    super(props);
    this.enableMessage = this.enableMessage.bind(this);

    this.state = {
      displayMessage: false,
    };

    this.timer = setTimeout(this.enableMessage, 3000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  enableMessage() {
    this.setState({displayMessage: true});
  }

  render() {
    const {displayMessage} = this.state;

    if (!displayMessage) {
      return null;
    }

    return <div>Loading...</div>;
  }
}

 