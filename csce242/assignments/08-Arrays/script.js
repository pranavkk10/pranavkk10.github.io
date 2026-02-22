(() => {
    const Happy = {
      "Happy by Pharrell Williams": "y6Sxv-sUYtM",
      "Don't Stop Me Now by Queen": "HgzGwKwLmgM",
      "Can't Stop the Feeling by Justin Timberlake": "ru0K8uYEZWw",
      "Don't Worry Be Happy by Bobby McFerrin": "d-diB65scQU",
      "I'm Walking on Sunshine by Katrina & the Waves": "iPUmE-tne5U"
    };
  
    const Sad = {
      "Happier Than Ever by Billie Eilish": "5GJWxDKyk3A",      
      "Someone You Loved by Lewis Capaldi": "zABLecsR5UE",
      "Someone Like You by Adele": "hLQl3WQQoQ0",
      "Fix You by Coldplay": "k4V3Mo61fJM",
      "Hurt by Johnny Cash": "8AHCfZTRGiI"
    };
  
    const moodMap = { Happy, Sad };
  
    const moodSelect = document.getElementById("moodSelect");
    const songList = document.getElementById("songList");
    const playerSection = document.getElementById("player");
    const playerContainer = document.getElementById("playerContainer");
  
    const clearChildren = el => { while (el.firstChild) el.removeChild(el.firstChild); };
    const hidePlayer = () => { clearChildren(playerContainer); playerSection.hidden = true; };
  
    const showVideo = videoId => {
      if (!videoId) return;
      const src = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
      clearChildren(playerContainer);
      const iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.title = "YouTube video player";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      playerContainer.appendChild(iframe);
      playerSection.hidden = false;
    };
  
    const populateList = mood => {
      clearChildren(songList);
      hidePlayer(); 
      if (!mood || !moodMap[mood]) return;
      const songs = moodMap[mood];
      Object.entries(songs).forEach(([title, videoId]) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `https://www.youtube.com/watch?v=${videoId}`;
        a.textContent = title;
        a.setAttribute("data-video-id", videoId);
        a.addEventListener("click", e => { e.preventDefault(); showVideo(videoId); });
        li.appendChild(a);
        songList.appendChild(li);
      });
    };
  
    moodSelect.addEventListener("change", e => populateList(e.target.value));
  
    document.addEventListener("DOMContentLoaded", () => {
      hidePlayer();
      clearChildren(songList);
    });
  })();