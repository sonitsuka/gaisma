function populateMusic(data) {
    const musicContent = document.getElementById('music-content');
    
    data.music.forEach(cardData => {
        const musicCard = document.createElement('div');
        musicCard.className = 'music-card';
        
        const h3 = document.createElement('h3');
        h3.innerText = cardData.category;
        musicCard.appendChild(h3);
        
        if (cardData.type === 'gallery') {
            const gallery = document.createElement('div');
            gallery.className = 'gallery';
            
            cardData.items.forEach(item => {
                const a = document.createElement('a');
                a.href = item.link;
                a.target = "_blank";
                
                const img = document.createElement('img');
                img.src = item.image;
                img.alt = "Album Thumbnail";
                a.appendChild(img);
                
                const p = document.createElement('p');
                p.innerText = item.description;
                a.appendChild(p);
                
                gallery.appendChild(a);
            });
            
            musicCard.appendChild(gallery);
        }
        
        musicContent.appendChild(musicCard);
    });
}

function populatePress(data) {
    const pressSection = document.getElementById('press');
    
    data.press.forEach(pressItem => {
        const pressList = document.createElement('div');
        pressList.className = 'press--list';
        
        const a = document.createElement('a');
        a.href = pressItem.link;
        a.innerText = pressItem.title;
        pressList.appendChild(a);
        
        const date = document.createElement('p');
        date.innerText = pressItem.date;
        pressList.appendChild(date);
        
        pressSection.appendChild(pressList);
    });
}

function populatePerformance(data) {
    const performanceSection = document.getElementById('performance');
    
    const description = document.createElement('p');
    description.innerText = data.performance.description;
    performanceSection.appendChild(description);
    
    data.performance.videos.forEach(videoCategory => {
        const videoCategoryDiv = document.createElement('div');
        videoCategoryDiv.className = 'video-category';
        
        const h3 = document.createElement('h3');
        h3.innerText = videoCategory.category;
        videoCategoryDiv.appendChild(h3);
        
        videoCategory.items.forEach(video => {
            const videoDiv = document.createElement('div');
            videoDiv.className = 'video';
            
            const a = document.createElement('a');
            a.href = video.link;
            a.target = "_blank";
            
            const img = document.createElement('img');
            img.src = video.thumbnail;
            a.appendChild(img);
            
            const title = document.createElement('p');
            title.className = 'p--title';
            title.innerText = video.title;
            a.appendChild(title);
            
            videoDiv.appendChild(a);
            
            if (video.credits) {
                const credit = document.createElement('p');
                credit.className = 'credit';
                credit.innerText = video.credits;
                videoDiv.appendChild(credit);
            }
            
            videoCategoryDiv.appendChild(videoDiv);
        });
        
        performanceSection.appendChild(videoCategoryDiv);
    });
}

function populateCuration(data) {
    const curationSection = document.getElementById('curation');
    
    const description = document.createElement('p');
    description.innerText = data.curation.description;
    curationSection.appendChild(description);

    // If there are other items or structures you'd like to include in the curation section,
    // they can be appended similarly to the description above.
}

// Call the functions with the JSON data
populateMusic(jsonData);
populatePress(jsonData);
populatePerformance(jsonData);
populateCuration(jsonData);

// Fetch data from the JSON file
fetch('data.json')
    .then(response => {
        // Ensure the fetch was successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Use the data to populate the website
        populateMusic(data);
        populatePress(data);
        populatePerformance(data);
        populateCuration(data);
    })
    .catch(error => {
        // Handle errors, like issues with fetching the file
        console.log('There was a problem with the fetch operation:', error.message);
    });
