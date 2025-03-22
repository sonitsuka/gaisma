document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('home--video');
    const screenContainer = document.querySelector('.screen-container');
    const videoSpace = document.getElementById('video-space');
    const tvContainer = document.querySelector('.tv-container');
    
    // Power knob functionality
    const powerKnob = document.getElementById('power-knob');
    let isPowerOn = true;
    
    powerKnob.addEventListener('click', function() {
      isPowerOn = !isPowerOn;
      
      if (isPowerOn) {
        tvContainer.classList.remove('tv-off');
        screenContainer.classList.add('tv-turn-on');
        
        // Turn on the video
        video.play();
        
        // Remove the turn-on animation after it completes
        setTimeout(() => {
          screenContainer.classList.remove('tv-turn-on');
        }, 1000);
      } else {
        tvContainer.classList.add('tv-off');
        
        // Pause the video
        video.pause();
      }
    });
    
    // Channel knob functionality (switch between different videos or effects)
    const channelKnob = document.getElementById('channel-knob');
    const videoSources = [
      '/images/gaisma-Matze-short.mp4',
      '/images/alternative-video.mp4',
      '/images/third-video.mp4'
    ];
    let currentChannel = 0;
    
    channelKnob.addEventListener('click', function() {
      // Add screen flicker effect
      screenContainer.classList.add('screen-flicker');
      
      // Change channel after a short delay
      setTimeout(() => {
        currentChannel = (currentChannel + 1) % videoSources.length;
        
        // Change video source
        video.src = videoSources[currentChannel];
        video.load();
        
        if (isPowerOn) {
          video.play();
        }
        
        // Remove flicker effect
        screenContainer.classList.remove('screen-flicker');
      }, 300);
    });
    
    // Volume knob functionality
    const volumeKnob = document.getElementById('volume-knob');
    let isMuted = true;
    
    volumeKnob.addEventListener('click', function() {
      isMuted = !isMuted;
      video.muted = isMuted;
    });
    
    // Adjust video size on load to maintain aspect ratio
    video.addEventListener('loadedmetadata', function() {
      adjustVideoSize();
    });
    
    // Handle window resize
    window.addEventListener('resize', adjustVideoSize);
    
    // Function to adjust video size based on aspect ratio
    function adjustVideoSize() {
      const videoAspect = video.videoHeight / video.videoWidth;
      const containerAspect = screenContainer.clientHeight / screenContainer.clientWidth;
      
      // Calculate video display width based on container and video aspect ratios
      let videoDisplayWidth;
      
      if (videoAspect > containerAspect) {
        // Video is taller than container (typical for mobile/vertical format)
        // Fit by height and center horizontally
        video.style.height = "100%";
        video.style.width = "auto";
        
        // Calculate the width of the video space for side bars
        videoDisplayWidth = screenContainer.clientHeight / videoAspect;
        videoSpace.style.width = videoDisplayWidth + "px";
      } else {
        // Video is wider than container
        // Fit by width and center vertically
        video.style.width = "100%";
        video.style.height = "auto";
        
        videoDisplayWidth = screenContainer.clientWidth;
        videoSpace.style.width = videoDisplayWidth + "px";
      }
    }
    
    // Start with power on
    video.play();
  });