class BlockTrack extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      itemName: '',
      userName: ''
    };
    this.handleItemNameChange = this.handleItemNameChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postData = this.postData.bind(this)
    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    this.getData()
    this.interval = setInterval(() => {
      this.getData()
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleItemNameChange(event) {
    this.setState({ itemName: event.target.value });
  }

  handleUserNameChange(event) {
    this.setState({ userName: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const item = this.state.itemName
    const user = this.state.userName
    this.postData(item, user)
    this.setState({
      userName: '',
      itemName: ''
    })
  }

  postData(item, user) {
    axios.post('http://localhost:3000/txs', {
      item: item,
      user: user
    })
      .then(response => {
        this.getData()
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getData() {
    axios.get('http://localhost:3000/state')
      .then((response) => {
        console.log(response);
        this.setState({ items: response.data.items })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const items = this.state.items

    return (
      <div>
        <div>
          <h1>BlockTrack</h1>
          <div className="card" style={{width: 30 + 'rem'}}>
             <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Item</label>
                  <input className="form-control" type="text" value={this.state.itemName} onChange={this.handleItemNameChange} />
                </div>
                <div className="form-group">
                  <label>Name</label>
                  <input className="form-control" type="text" value={this.state.userName} onChange={this.handleUserNameChange} />
                </div>
                <button type="submit" className="btn btn-primary btn-block" disabled={!this.state.itemName || !this.state.userName}>Submit</button>
              </form>
             </div>
          </div>
        </div>
        <br /><br />
        <div className="card" style={{width: 30 + 'rem'}}>
          <div className="card-body">
            <h5 className="card-title" style={{marginBottom: 0}}>Inventory</h5>
          </div>
          <ul className="list-group list-group-flush">
            {Object.keys(items).map(function (key, idx) {
              return (<li className="list-group-item" key={idx}>{key} -> {items[key]}</li>)
            })}
          </ul>
        </div>
      </div>
    );
  }
}


var App = React.createClass({
  render: function () {
    return <BlockTrack />;
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
