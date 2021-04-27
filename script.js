
const popupContainer = document.querySelector('.popup-container');
const booksContainer = document.querySelector('.books-container');

const addNewBook = document.querySelector('.add-new-book');
addNewBook.addEventListener('click', () => {
  popupContainer.style.display = 'block';
});

const close = document.querySelector('.close');
close.addEventListener('click', () => {
  popupContainer.style.display = 'none';
});

const add = document.querySelector('.add');
add.addEventListener('click', () => {
  const title = document.querySelector('.title').value;
  document.querySelector('.title').value = '';
  const author = document.querySelector('.author').value;
  document.querySelector('.author').value = '';
  const pages = document.querySelector('.no-pages').value;
  document.querySelector('.no-pages').value = '';
  const read = document.querySelector('.read').checked;
  document.querySelector('.read').checked = false;

  const newBook = new Book(title, author, pages, read);
  localLibrary.push(newBook);

  popupContainer.style.display = 'none';

  booksContainer.appendChild(createBookDOM(newBook));
  updateLocalStorage();
  update();
});

class Book {
  constructor (title, author, pages, read) {
    this.title = title || 'Unknown';
    this.author = author || 'Unknown';
    this.pages = pages || 'Unknown';
    this.read = read;
    this.id = Date.now().toString();
  }
}

function createBookDOM(book) {

  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');

  const bookCardDetails = document.createElement('div');
  bookCardDetails.classList.add('book-card-details');

  const bookCardControls = document.createElement('div');
  bookCardControls.classList.add('book-card-controls');

  const title = document.createElement('h3');
  title.textContent = book.title;

  const author = document.createElement('h4');
  author.textContent = book.author;

  const pages = document.createElement('p');
  pages.textContent = 'Pages: ' + book.pages;

  const removeButton = document.createElement('button');
  removeButton.setAttribute('id', book.id);
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', (e) => {
    for (let i = 0; i < localLibrary.length; i++) {
      if (localLibrary[i].id === e.target.id) {
        localLibrary.splice(i, 1);
        updateLocalStorage();
        update();
      }
    }
  });

  const toggleButton = document.createElement('button');
  toggleButton.classList.add('toggle-button');
  toggleButton.textContent = (book.read) ? 'Complete' : 'Incomplete';
  toggleButton.addEventListener('click', () => {
    if (book.read) {
      toggleButton.textContent = 'Incomplete';
    } else {
      toggleButton.textContent = 'Complete';
    }
    book.read = !book.read;
    updateLocalStorage();
  });

  bookCardDetails.appendChild(title);
  bookCardDetails.appendChild(author);
  bookCardDetails.appendChild(pages);

  bookCardControls.appendChild(removeButton);
  bookCardControls.appendChild(toggleButton);
  
  bookCard.appendChild(bookCardDetails);
  bookCard.appendChild(bookCardControls);

  return bookCard;
}

function updateLocalStorage() {
  localStorage.setItem('storedBooks', JSON.stringify(localLibrary));
}

function update() {
  booksContainer.innerHTML = '';
  if (localStorage.getItem('storedBooks')) {
    localLibrary = JSON.parse(localStorage.getItem('storedBooks'));
  }
  localLibrary.forEach(book => {
    booksContainer.appendChild(createBookDOM(book));
  });
}

let localLibrary = [
  new Book('Fluent Python', 'Luciano Ramalho', 1069, false)
];

update();
