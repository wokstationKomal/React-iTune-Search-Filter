import React from 'react';
import '../Styles/Search.css';
import axios from 'axios';
import Loader from '../components/loader.gif';

class Search extends React.Component{

    constructor(props){
        super( props );

        this.state = {
            query: '',
            resultList: {},
            loading: false,
            message: ''
        };

        this.cancel = '';
      }

      fetchSearchResults = ( query ) => {
        const searchUrl = `https://itunes.apple.com/search?term=${query}`;
        if(this.cancel){
            this.cancel.cancel();
        }

        this.cancel = axios.CancelToken.source();
        axios.get(searchUrl, {
            cancelToken: this.cancel.token
        })
        .then(res =>{
            // console.warn(res.data.results.length);
            const resultNotFoundMsg = ! res.data.results.length
                                      ? 'There are No more search results'
                                        : '';

            this.setState({
                resultList: res.data.results,
                message: resultNotFoundMsg,
                loading: false
            })
        })
        .catch(error => {
            if(axios.isCancel(error) || error){
                this.setState({
                    loading: false,
                    message: 'Failed to fetch the Data'
                })
            }
        })
      };

    //   take the search query
      handleOnInputChange = ( event ) => {
        const query = event.target.value;
        if(!query){
            this.setState({ query, resultList: {}, message: '' })
        }else{
            this.setState( { query: query, loading: true, message:'' }, () =>{
                this.fetchSearchResults(query);
            }); 
        }
      };

    //   Show the result
      renderSearchResults = () =>{
        const { resultList } = this.state;
        // console.warn(resultList);
        if(Object.keys(resultList).length && resultList.length){
            return (
                <div className="results-container">
                    <p>{resultList.length} Results found</p>
                    {
                        resultList.map( results =>{
                            return (
                                    <a key={results.trackId} href={results.previewUrl} className="result-item">
                                        
                                            <div className="image-wrapper">
                                                <img src={results.artworkUrl100} alt={results.artistName}></img>
                                            </div>
                                            <div className="result-details">
                                                <h3 className="image-username">{results.artistName}</h3>
                                                <h5 className="song-name">{results.trackName}</h5>
                                            </div>
                                    </a>
                            )
                        })
                    }
                </div>
            )
        }
      };

    render() {
        const { query, loading, message } = this.state;
        return (
            <div className="container" id="search-content">
                {/* <h2 className="heading">Live Search: React Application</h2> */}
                <label className="search-label" htmlFor="search-input">
                        <input 
                            type="text"
                            name="query"
                            value={query}
                            id="search"
                            placeholder="Search..."
                            onChange={this.handleOnInputChange}/>
                    <button title="Search" type="submit" className="search-icon">
                        <i className="fas fa-search"></i>
                    </button>
                </label>

                {/* Error Message */}
                {message && <p className="message">{ message }</p>}

                {/* Loader */}
                <img src={Loader} className={`search-loading ${loading ? 'show': 'hide'}`} alt=""></img>

                {/* Results */}
                { this.renderSearchResults() }

            </div>
        )
    }
}

export default Search