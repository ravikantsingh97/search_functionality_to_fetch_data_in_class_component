import React, { Component } from 'react';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            users: [],
        };
    }

    handleSearch = (event) => {
        this.setState({ searchValue: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { searchValue } = this.state;
        fetch(`https://api.github.com/users/${searchValue}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ users: [data] });
            })
            .catch((error) => console.error(error));
    };

    render() {
        const { searchValue, users } = this.state;
        return (
            <div className='sub'>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter GitHub username"
                        value={searchValue}
                        onChange={this.handleSearch}
                    />
                    <button type="submit">Search</button>
                </form>
                {users.map((user) => (
                    <div className='mojombo' key={user.id}>

                        <br></br>
                        <h2>Name - {user.name}</h2>
                        <br></br>
                        <h2>Location - {user.location}</h2>
                        <br></br>
                        <h2> Twitter_username - {user.twitter_username}</h2>
                        <img src={user.avatar_url} alt={user.login} width="300px" />


                    </div>
                ))}
            </div>
        );
    }
}

export default Main;
