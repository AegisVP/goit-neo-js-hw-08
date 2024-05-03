const galleryItems = [
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];
// Change code below this line

const galleryRootEl = document.querySelector('div.gallery');
const galleryHtmlMarkup = galleryItems.map(createImageCardMarkup).join('');
class ModalWindow {
  constructor(el) {
    if (!el) {
      return;
    }

    this.clickHandler = this.onModalClick.bind(this);

    (this.onCloseCallback = null), (this.modalEl = el);
  }

  build(markup, onCloseCallback = none) {
    if (!this.modalEl) {
      console.error('no modal root defined');
      return;
    }

    this.modalEl.innerHTML = markup;

    if (onCloseCallback && typeof onCloseCallback === 'function') {
      this.onCloseCallback = onCloseCallback;
    }
  }

  show() {
    this.modalEl.classList.add('is-open');
    this.modalEl.addEventListener('click', this.clickHandler);
  }

  onModalClick(e) {
    console.log(e.target);
    if (e.target === this.modalEl) {
      this.close();
    }
  }

  close(e) {
    this.modalEl.classList.remove('is-open');
    this.modalEl.removeEventListener('click', this.clickHandler);
    if (this.onCloseCallback) {
      this.onCloseCallback();
    }
  }

  visible() {
    return this.modalEl.classList.contains('is-open');
  }

  element() {
    return this.modalEl;
  }
}
const instanceModal = new ModalWindow(document.querySelector('#modal'));

galleryRootEl.insertAdjacentHTML('afterbegin', galleryHtmlMarkup);
galleryRootEl.addEventListener('click', onGalleryClick);

function createImageCardMarkup({ preview, original, description } = {}) {
  return `
			<div class="gallery__item">
				<a class="gallery__link" href="${original}">
					<img
						class="gallery__image"
						src="${preview}"
						data-source="${original}"
						alt="${description}"
					/>
				</a>
			</div>`;
}

function onGalleryClick(e) {
  e.preventDefault();
  openModalImage(e.target.dataset.source);
}

const openModalImage = src => {
  if (instanceModal?.visible()) {
    instanceModal.close();
  }

  instanceModal.build(`<img src="${src}" width="1280" alt="original">`, () => {
    window.removeEventListener('keydown', onKeyboardClick);
  });
  instanceModal.show();
  window.addEventListener('keydown', onKeyboardClick);
  // console.log(instanceModal.element().querySelector('img').src);
};

function closeModal() {
  instanceModal.close();
}

function onKeyboardClick(e) {
  const oldSrcIndex = findCurrentSrcIndex(instanceModal.element().querySelector('img').src);

  console.log('oldSrcIndex', oldSrcIndex);

  switch (e?.code) {
    case 'Escape':
      closeModal();
      return;

    case 'ArrowLeft':
    case 'ArrowDown':
      openModalImage(galleryItems[oldSrcIndex === 0 ? galleryItems.length - 1 : oldSrcIndex - 1].original);
      break;

    case 'ArrowRight':
    case 'ArrowUp':
    case 'Space':
      openModalImage(galleryItems[oldSrcIndex === galleryItems.length - 1 ? 0 : oldSrcIndex + 1].original);
      break;
  }
}

function findCurrentSrcIndex(src) {
  for (let i = 0; i < galleryItems.length; i += 1) {
    if (galleryItems[i].original === src) return i;
  }
  return;
}
