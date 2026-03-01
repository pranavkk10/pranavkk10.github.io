class Song {
  constructor({ title, artist, album, year, genre, coverArt, youtubeCode }) {
    this.title = title;
    this.artist = artist;
    this.album = album;
    this.year = year;
    this.genre = genre;
    this.coverArt = coverArt;
    this.youtubeCode = youtubeCode;
  }

  getCard(index) {
    const card = document.createElement('article');
    card.className = 'card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.dataset.index = index;

    const top = document.createElement('div');
    top.className = 'card-top';
    const h3 = document.createElement('h3');
    h3.textContent = this.title;
    const p = document.createElement('p');
    p.textContent = `By ${this.artist}`;
    top.appendChild(h3);
    top.appendChild(p);

    const img = document.createElement('img');
    img.className = 'cover';
    img.src = this.coverArt;
    img.alt = `${this.title} — ${this.album} cover`;

    card.appendChild(top);
    card.appendChild(img);

    return card;
  }
}

const songs = [
  new Song({
    title: 'Two-Headed Boy',
    artist: 'Neutral Milk Hotel',
    album: 'In the Aeroplane Over the Sea',
    year: 1998,
    genre: 'Folk / Indie',
    coverArt: 'images/boy.jpeg',
    youtubeCode: 'TudLjZ_4VhU'
  }),
  new Song({
    title: 'Jailhouse Rock',
    artist: 'Elvis Presley',
    album: 'Jailhouse Rock (EP)',
    year: 1957,
    genre: 'Rock & Roll',
    coverArt: 'images/rock.jpeg',
    youtubeCode: 'gj0Rz-uP4Mk'
  }),
  new Song({
    title: 'So What',
    artist: 'Miles Davis',
    album: 'Kind of Blue',
    year: 1959,
    genre: 'Jazz',
    coverArt: 'images/what.jpeg',
    youtubeCode: 'zqNTltOGh5c'
  }),
  new Song({
    title: 'Jolene',
    artist: 'Dolly Parton',
    album: 'Jolene',
    year: 1974,
    genre: 'Country',
    coverArt: 'images/Jolene.jpeg',
    youtubeCode: 'Ixrje2rXLMA'
  })
];

const gallery = document.getElementById('gallery');
const modal = document.getElementById('songModal');
const modalTitle = document.getElementById('modalTitle');
const modalArtist = document.getElementById('modalArtist');
const modalAlbum = document.getElementById('modalAlbum');
const modalYear = document.getElementById('modalYear');
const modalGenre = document.getElementById('modalGenre');
const modalCover = document.getElementById('modalCover');
const modalVideo = document.getElementById('modalVideo');
const modalClose = document.getElementById('modalClose');

function renderGallery() {
  songs.forEach((song, idx) => {
    const card = song.getCard(idx);
    card.addEventListener('click', () => openModal(idx));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(idx);
      }
    });
    gallery.appendChild(card);
  });
}

function openModal(index) {
  const song = songs[index];
  modalTitle.textContent = song.title;
  modalArtist.textContent = `by ${song.artist}`;
  modalAlbum.textContent = `${song.album}`;
  modalYear.textContent = `${song.year}`;
  modalGenre.textContent = `${song.genre}`;
  modalCover.src = song.coverArt;
  modalCover.alt = `${song.album} cover`;

  modalVideo.innerHTML = '';
  if (song.youtubeCode) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${song.youtubeCode}`;
    iframe.title = `${song.title} — YouTube`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.setAttribute('allowfullscreen', '');
    modalVideo.appendChild(iframe);
  } else {
    modalVideo.textContent = 'No video available';
  }

  modal.style.display = 'block';
  modal.querySelector('.w3-modal-content').focus();
}

function closeModal() {
  modalVideo.innerHTML = '';
  modal.style.display = 'none';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'block') closeModal();
});

renderGallery();