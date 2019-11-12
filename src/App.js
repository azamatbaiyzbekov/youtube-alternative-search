import React, {Component} from 'react';
import SearchBar from './components/Searchbar/Searchbar';
import video from './apis/video';
import VideoList from './components/VideoList/VideoList';
import VideoDetail from './components/VideoDetail/VideoDetail';

class App extends Component {
    state = {
        videos: [],
        selectedVideo: null
    }
    handleSubmit = async (termFromSearchBar) => {
        const response = await video.get('/search', {
            params: {
                q: termFromSearchBar
            }
        })
        this.setState({
            videos: response.data.items
        })
    };
    handleVideoSelect = (video) => {
        this.setState({selectedVideo: video})
    }

    render() {
        return (
            <>
        <nav>
            <div class="nav-wrapper blue">
                <div class="container">
                    <a href="#" class="brand-logo center">Youtube Search Alternative</a>
                </div>
            </div>
        </nav> 
          <div className="card card-body mb-4 p-4">
            <h1 className="display-4 text-center">
                <i class="fa fa-youtube-square" aria-hidden="true"></i>
            </h1>
                <p className="lead text-center">Search for a videos</p>
          </div>
            <div className='ui container' style={{marginTop: '1em'}}>
                <SearchBar handleFormSubmit={this.handleSubmit}/>
                <div className='ui grid'>
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo}/>
                        </div>
                        <div className="five wide column">
                            <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default App;