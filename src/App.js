import React, { useState, useEffect } from "react";

import { Grid } from '@material-ui/core';

import { VideoList, VideoDetail, SearchBar } from './components';

import youtube from "./api/youtube";

const App = () =>  {
    const [ videos, setVideos ] = useState([]);
    const [ selectedVideo, setSelectedVideo ] = useState('');

    useEffect(() => {
        handleSubmit('React JS Crash Course');
    },[]);

    const onVideoSelect = (video) => {
        setSelectedVideo(video);
    }


    const handleSubmit = async(searchTerm) => {
        const response = await youtube.get('search', { params: { q: searchTerm}});
        
        setVideos(response.data.items);

        setSelectedVideo(response.data.items[0]);
    }
        return(
            <Grid justifyContent="center" container spacing={10}>
                <Grid item xs={12}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit={handleSubmit}/>
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetail video={selectedVideo} />
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList videos={videos} onVideoSelect={onVideoSelect}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
}

export default App;